"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FiFilePlus } from "react-icons/fi";
import { Button } from "./ui/button";
import { FormEvent, useState } from "react";
import { Category } from "@/core/entity/Category";
import { useCategoryStore } from "@/store/category/categoryStore";
import { CreateCategoryPayload } from "@/core/infrastructure/category/ICategoryRepository";

const CreateCategoryDialog = () => {
  const [newCat, setNewCat] = useState<CreateCategoryPayload>({ name: "" });
  const { createNewCategory, categories } = useCategoryStore();
  const [disabled, setDisabled] = useState(true);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!newCat.name) {
      alert("new cat does not have name");
      return;
    }
    if (categories.find((c) => c.name === newCat.name)) {
      alert("category name must unique");
      return;
    }
    createNewCategory(newCat);
    setNewCat({ name: "" });
  };

  return (
    <Dialog>
      <DialogTrigger className="bg-slate-800 rounded-md p-4 ">
        <div className="flex items-center space-x-2">
          <FiFilePlus className="text-2xl" />
          <h2 className="text-lg text-white font-medium">
            Create New Category
          </h2>
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Category</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          Category Name Must Be Unique and It is not case sensitive
        </DialogDescription>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Name
              </Label>
              <Input
                id="name"
                value={newCat.name}
                onChange={(e) => {
                  setNewCat({
                    name: e.target.value,
                  });
                  if (
                    categories.find(
                      (c) =>
                        c.name.toLowerCase().trim() ===
                        e.target.value.toLowerCase().trim()
                    )
                  ) {
                    setDisabled(true);
                  } else {
                    setDisabled(false);
                  }
                }}
                className="col-span-3"
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button disabled={disabled} type="submit">
                Submit
              </Button>
            </DialogClose>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateCategoryDialog;
