import { Button } from "@/components/ui/button";
import { syncProfileImage } from "@/lib/firebase/user/updateProfileImage";
import imageCompression from "browser-image-compression";
import type { User } from "firebase/auth";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { toast } from "sonner";
import FormBlock from "./formBlock";

interface Props {
  user: User | null;
  photoURL: string;
}

export default function ProfileImageForm({ user, photoURL }: Props) {
  const router = useRouter();
  const [preview, setPreview] = useState(photoURL);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isImageChanged = preview !== photoURL;

  const handleImageChange = async (file: File | null) => {
    if (!file) return;

    const compressed = await imageCompression(file, {
      maxSizeMB: 0.5,
      maxWidthOrHeight: 1024,
      useWebWorker: true,
    });

    setImageFile(compressed);
    setPreview(URL.createObjectURL(compressed));
  };

  const handleSelectImage = () => fileInputRef.current?.click();

  const handleDeleteImage = () => {
    setImageFile(null);
    setPreview("");
  };

  const handleSaveImage = async () => {
    if (!user) return;

    try {
      const resultUrl = await syncProfileImage(user.uid, imageFile);
      setPreview(resultUrl ?? "");

      toast.success("프로필 이미지가 저장되었습니다.");
      router.refresh();
    } catch (err) {
      console.error("저장 실패", err);
      toast.error("프로필 이미지 저장 중 오류가 발생했습니다.");
    }
  };

  const btnClass =
    "subtitle bg-green-400 text-white text-nowrap disabled:bg-content/20 disabled:text-content";

  return (
    <FormBlock label="프로필 사진" htmlFor="profile-image">
      <div className="mt-3 flex items-center gap-6">
        <div
          className="flex aspect-square w-16 items-center justify-center overflow-hidden rounded-full border"
          aria-labelledby="profile-image"
        >
          <Image
            src={preview || "/preview.jpg"}
            alt="프로필 사진 미리보기"
            width={80}
            height={80}
            className="h-full w-full object-cover"
            priority
          />
        </div>
        <div className="mt-2 flex flex-col gap-2">
          <input
            id="profile-image"
            type="file"
            accept="image/*"
            hidden
            ref={fileInputRef}
            onChange={(e) => handleImageChange(e.target.files?.[0] ?? null)}
            aria-label="프로필 이미지 선택"
          />
          <div className="flex gap-2">
            <Button type="button" className={btnClass} onClick={handleSelectImage}>
              변경
            </Button>
            <Button
              type="button"
              className={btnClass}
              onClick={handleDeleteImage}
              disabled={!preview}
            >
              삭제
            </Button>
            <Button
              type="button"
              className={btnClass}
              onClick={handleSaveImage}
              disabled={!isImageChanged}
            >
              저장
            </Button>
          </div>
        </div>
      </div>
    </FormBlock>
  );
}
