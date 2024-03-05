"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";
import { useState, useTransition } from "react";
import { createEntry } from "./action";
import { toast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { schema } from "./schema";
import { Form } from "@/components/ui/form";
import { TextField } from "@/components/form/textField/TextField";
import { TextAreaField } from "@/components/form/textAreaField/TextAreaField";
import { MultiSelectField } from "@/components/form/multiSelectField/MultiSelectField";
import { Tag } from "@/lib/services/tags/types";
import { z } from "@/lib/validators/validators";

type FormValues = z.infer<typeof schema>;

type AddEntryModalProps = {
  tags: Array<Omit<Tag, "createdAt">>;
};

export const AddEntryModal = ({ tags }: AddEntryModalProps) => {
  const t = useTranslations("addEntryModal");

  const [isOpen, setIsOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<FormValues>({
    mode: "onChange",
    resolver: zodResolver(schema),
  });

  const onSubmitHandler = async (values: FormValues) => {
    startTransition(async () => {
      const chosenTags = values.tags.filter((tag) => !!tag.value);
      const addedTags = values.tags.filter((tag) => tag.value === null);

      const { status } = await createEntry({
        ...values,
        tags: {
          chosen: chosenTags.map((tag) => String(tag.value)),
          added: addedTags.map((tag) => tag.label),
        },
      });

      if (status === "success") {
        toast({
          title: t("successToast.title"),
          description: t("successToast.description"),
        });
        setIsOpen(false);
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>{t("button")}</Button>
      </DialogTrigger>
      <DialogContent
        className="overflow-y-scroll max-h-screen"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmitHandler)}>
            <DialogHeader>{t("title")}</DialogHeader>
            <div className="flex flex-col gap-4 my-4">
              <TextField
                control={form.control}
                name="title"
                label={t("form.title.label")}
                placeholder={t("form.title.placeholder")}
              />
              <TextAreaField
                control={form.control}
                name="description"
                label={t("form.description.label")}
                placeholder={t("form.description.placeholder")}
              />
              <TextField
                control={form.control}
                name="url"
                label={t("form.link.label")}
                placeholder={t("form.link.placeholder")}
              />
              {/* TODO change that to image dropzone or file upload input and upload image to some cloud service */}
              <TextField
                control={form.control}
                name="thumbnailUrl"
                label={t("form.thumbnail.label")}
                placeholder={t("form.thumbnail.placeholder")}
              />
              <MultiSelectField
                name="tags"
                control={form.control}
                items={tags.map(({ id, name }) => ({ label: name, value: id }))}
                label={t("form.tags.label")}
                placeholder={t("form.tags.placeholder")}
              />
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="button" variant="outline">
                  {t("form.cancelButton")}
                </Button>
              </DialogClose>
              <Button type="submit" disabled={isPending}>
                {t("form.submitButton")}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};
