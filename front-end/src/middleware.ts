import { NextResponse } from 'next/server';
import { jwtVerify } from 'jose';
import type { NextRequest } from 'next/server';
import { COOKIES_NAME } from './shared/constants';

export const middleware = async (request: NextRequest) => {
  const isOrganizationRoute = request.nextUrl.pathname.startsWith('/organizacao');

  if (!isOrganizationRoute) {
    return NextResponse.next();
  }

  const token = request.cookies.get(COOKIES_NAME.TOKEN)?.value;

  const isPrivateOrganizationRoute =
    request.nextUrl.pathname.startsWith('/organizacao/pets');

  if (isPrivateOrganizationRoute && !token) {
    const response = NextResponse.redirect(new URL(`/organizacao/entrar`, request.url));

    response.cookies.delete(COOKIES_NAME.TOKEN);

    return response;
  }

  try {
    await jwtVerify(
      token as string,
      new TextEncoder().encode(process.env.JWT_SECRET_KEY),
    );

    const isPublicOrganizationRoute =
      request.nextUrl.pathname.startsWith('/organizacao/entrar') ||
      request.nextUrl.pathname.startsWith('/organizacao/cadastrar');

    if (isPublicOrganizationRoute) {
      return NextResponse.redirect(new URL('/organizacao/pets', request.url));
    }

    return NextResponse.next();
  } catch (error) {
    if (isPrivateOrganizationRoute) {
      const response = NextResponse.redirect(new URL(`/organizacao/entrar`, request.url));

      response.cookies.delete(COOKIES_NAME.TOKEN);

      return response;
    }
  }
};
