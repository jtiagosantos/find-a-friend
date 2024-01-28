'use client';

import Link from 'next/link';
import { useQuery } from '@tanstack/react-query';

import { PetService } from '@/infra/services/pet.service';

import { PetCard } from '@/shared/components/pet-card';

import PlusIcon from '@/shared/assets/icons/plus.svg';

const petService = new PetService();

export default function PetsPage() {
  const { data: pets, isFetching } = useQuery({
    queryKey: ['organization/pets'],
    queryFn: () => {
      return petService.findByOrganization();
    },
    initialData: [],
  });

  return (
    <div>
      <div className="flex items-center justify-between mb-10">
        <h1 className="text-2xl font-semibold text-[#0D3B66]">Seus Pets Cadastrados</h1>
        <Link
          href="/pets/cadastrar"
          className="bg-[#0D3B66] text-white p-2 rounded-md flex items-center gap-1 w-fit pr-3">
          <PlusIcon />
          Cadastrar Pet
        </Link>
      </div>

      <div className="flex gap-4 flex-wrap">
        {isFetching && <p className="text-xl">Carregando pets...</p>}
        {!isFetching && (
          <>
            {pets.map((pet, index) => (
              <Link
                href={`/pets/${pet.id}/editar`}
                className="max-w-[280px] w-full rounded-3xl block"
                key={pet.id}>
                <PetCard
                  name={pet.name}
                  photo={pet.photos[0].source}
                  petFaceCardBgColor={index % 2 === 0 ? 'red' : 'yellow'}
                />
              </Link>
            ))}
          </>
        )}
      </div>
    </div>
  );
}
