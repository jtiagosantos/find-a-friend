'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useDropzone } from 'react-dropzone';
import cuid from 'cuid';

import { InputField } from '@/shared/components/input-field';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/shared/components/ui/select';

import PetFaceIcon from '@/shared/assets/icons/pet-face.png';
import LeftArrowIcon from '@/shared/assets/icons/left-arrow.svg';
import LogOutIcon from '@/shared/assets/icons/log-out.svg';
import UploadCloudIcon from '@/shared/assets/icons/upload-cloud.svg';
import PicturesIcon from '@/shared/assets/icons/pictures.svg';
import FileIcon from '@/shared/assets/icons/file.svg';
import XSquareIcon from '@/shared/assets/icons/x-square.svg';
import RedPlusIcon from '@/shared/assets/icons/red-plus.svg';

type Photo = {
  file: File;
  metadata: {
    id: string;
    status: 'WAITING' | 'UPLOADING' | 'DONE' | 'FAIL';
  };
};

type Requirement = Record<string, string>;

export default function RegisterPetPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [requirements, setRequirements] = useState<Requirement>({});

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: (acceptedFiles) => {
      setPhotos(
        acceptedFiles.map((file) => ({
          file,
          metadata: {
            id: cuid(),
            status: 'WAITING',
          },
        })),
      );
    },
    accept: {
      'image/png': ['.png'],
    },
  });

  const handleRemovePhoto = (photoId: string) => {
    setPhotos((prevPhotos) =>
      prevPhotos.filter((photo) => photo.metadata.id !== photoId),
    );
  };

  const handleAddRequirement = (requirement: Requirement) => {
    setRequirements((prevRequirements) => ({
      ...prevRequirements,
      ...requirement,
    }));
  };

  const handleChangeRequirement = (key: string, text: string) => {
    setRequirements((prevRequirements) => ({
      ...prevRequirements,
      [key]: text,
    }));
  };

  const handleRemoveRequirement = (key: string) => {
    const data = { ...requirements };

    delete data[key];

    setRequirements(data);
  };

  return (
    <div className="flex items-start pb-[60px] relative pl-[96px]">
      <div className="bg-[#F15156] h-[620px] px-6 py-8 flex flex-col justify-between fixed left-0">
        <Image src={PetFaceIcon.src} width={45} height={45} alt="" />
        <Link href="/organizacao/pets" className="block bg-[#F4D35E] rounded-2xl p-3">
          <LeftArrowIcon />
        </Link>
      </div>
      <div className="max-w-[708px] w-full mx-auto mt-[108px]">
        <div className="bg-[#0D3B66] rounded-[20px] py-[28px] pl-[72px] pr-20 flex items-center justify-between">
          <div className="flex items-center gap-[18px]">
            <div className="bg-[#F27006] p-[18px] rounded-2xl">
              <Image src={PetFaceIcon.src} width={28} height={28} alt="" />
            </div>
            <div>
              <h1 className="font-bold text-[20px] text-white">Seu Cãopanheiro</h1>
              <p className="font-semibold text-base text-white">
                Rua do meio, 123 , Boa viagem, Recife - PE{' '}
              </p>
            </div>
          </div>
          <button className="bg-[#114A80] rounded-2xl p-5">
            <LogOutIcon />
          </button>
        </div>
        <form className="mt-[30px] bg-white rounded-[20px] border-[1px] border-[#D3E2E5] px-[80px] pb-[80px] pt-[64px]">
          <h2 className="text-[#0D3B66] font-extrabold text-4xl pb-[22px] border-b-[1px] border-b-[#D3E2E5] mb-10">
            Adicione um pet
          </h2>

          <InputField.Root>
            <InputField.Label htmlFor="name">Nome</InputField.Label>
            <InputField.Text type="text" id="name" />
          </InputField.Root>
          <InputField.Root className="mt-6">
            <InputField.Label htmlFor="about">Sobre</InputField.Label>
            <InputField.Textarea id="about" />
          </InputField.Root>
          <InputField.Root className="mt-6">
            <InputField.Label htmlFor="age">Idade</InputField.Label>
            <Select defaultValue="1">
              <SelectTrigger id="age">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="1">Filhote (1 ano)</SelectItem>
                  <SelectItem value="2">Jovem (2 anos)</SelectItem>
                  <SelectItem value="3">Adulto jovem (3 anos)</SelectItem>
                  <SelectItem value="4">Adulto (4 anos)</SelectItem>
                  <SelectItem value="5">Adulto maduro (5 anos)</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </InputField.Root>
          <InputField.Root className="mt-6">
            <InputField.Label htmlFor="size">Tamanho</InputField.Label>
            <Select defaultValue="MEDIUM">
              <SelectTrigger id="size">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="SMALL">Pequeno</SelectItem>
                  <SelectItem value="MEDIUM">Médio</SelectItem>
                  <SelectItem value="LARGE">Grande</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </InputField.Root>
          <InputField.Root className="mt-6">
            <InputField.Label htmlFor="energy">Nível de Energia</InputField.Label>
            <Select defaultValue="3">
              <SelectTrigger id="energy">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </InputField.Root>
          <InputField.Root className="mt-6">
            <InputField.Label htmlFor="energy">Nível de Dependência</InputField.Label>
            <Select defaultValue="MEDIUM">
              <SelectTrigger id="energy">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="LOW">Baixo</SelectItem>
                  <SelectItem value="MEDIUM">Médio</SelectItem>
                  <SelectItem value="HIGHT">Alto</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </InputField.Root>
          <InputField.Root className="mt-6">
            <InputField.Label htmlFor="photos">Fotos</InputField.Label>
            <div {...getRootProps()} className="mb-2">
              <input {...getInputProps()} id="photos" />
              <div
                className={`
                w-full 
                h-[152px] 
                rounded-[10px] 
                bg-[#F5F8FA] 
                border-[1px] 
                border-[#D3E2E5] 
                flex 
                flex-col 
                items-center 
                justify-center 
                gap-3
              `}>
                {isDragActive ? (
                  <>
                    <PicturesIcon />
                    <p className="font-semibold text-[18px] text-[#0D3B66]">
                      Solte os arquivos aqui
                    </p>
                  </>
                ) : (
                  <>
                    <UploadCloudIcon />
                    <p className="font-semibold text-[18px] text-[#0D3B66]">
                      Arraste e solte os arquivos
                    </p>
                    <p className="text-[#0D3B66] text-sm -mt-2">
                      (Apenas arquivos *.png serão aceitos)
                    </p>
                  </>
                )}
              </div>
            </div>
            {photos.map((photo) => (
              <div className="w-full p-3 flex items-center justify-between rounded-[10px] border-[1px] border-[#D3E2E5]">
                <div className="flex items-center gap-3">
                  <FileIcon />
                  <p
                    key={photo.metadata.id}
                    className="text-[#0D3B66] text-sm font-normal">
                    {photo.file.name}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => handleRemovePhoto(photo.metadata.id)}>
                  <XSquareIcon />
                </button>
              </div>
            ))}
          </InputField.Root>

          <h2 className="text-[#0D3B66] font-extrabold text-4xl pb-[22px] border-b-[1px] border-b-[#D3E2E5] mb-10 mt-[60px]">
            Requesitos para adoção
          </h2>

          <InputField.Root>
            <InputField.Label>Requisito</InputField.Label>
            {Object.keys(requirements).map((key) => (
              <div key={key} className="relative">
                <InputField.Text
                  type="text"
                  value={requirements[key]}
                  onChange={({ target }) => handleChangeRequirement(key, target.value)}
                  className="pr-10"
                />
                <button
                  type="button"
                  className="absolute right-3 top-[17px]"
                  onClick={() => handleRemoveRequirement(key)}>
                  <XSquareIcon />
                </button>
              </div>
            ))}
          </InputField.Root>
          <button
            type="button"
            className={`
            w-full 
            py-6 
            flex
            items-center 
            justify-center 
            bg-[#FC86861A] 
            border-[2px] 
            border-[#E44449] 
            border-dashed
            rounded-[10px]
            mt-3
          `}
            onClick={() => {
              handleAddRequirement({
                [cuid()]: '',
              });
            }}>
            <RedPlusIcon />
          </button>

          <button
            className={`
            w-full 
            bg-[#F4D35E] 
            rounded-[20px] 
            text-center 
            py-5 
            mt-[60px] 
            text-[#0D3B66]
             font-extrabold 
             text-[20px]
          `}>
            Confirmar
          </button>
        </form>
      </div>
    </div>
  );
}
