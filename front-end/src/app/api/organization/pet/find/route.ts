import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { apiClient } from '@/infra/http/api.client';
import { COOKIES_NAME } from '@/shared/constants';

export const GET = async (request: NextRequest) => {
  try {
    const token = request.cookies.get(COOKIES_NAME.TOKEN)?.value;

    const { data } = await apiClient.get('/pets/organization', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
};
