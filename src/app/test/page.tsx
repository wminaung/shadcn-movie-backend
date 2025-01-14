"use client";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { uploadFileToFirebase } from "@/db/storage/upload";

const TestImage = () => {
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const files = target.files;
    if (!files || !files.length) {
      return;
    }
    const file = files[0];
    if (file.type !== "image/jpeg" && file.type !== "image/png") {
      alert("Please upload a JPEG or PNG image.");
      return;
    }
    // const url = await uploadFileToFirebase(file);

    // console.log(`url`, url);
  };

  return (
    <div>
      {" "}
      <div>
        <Label htmlFor="picture">Picture</Label>
        <Input
          id="picture"
          name="picture"
          type="file"
          accept="image/jpeg, image/png" // Allow only jpeg and png files
          onChange={handleFileChange}
          className="mb-2 p-2 border rounded w-full"
        />
      </div>
    </div>
  );
};

export default TestImage;
