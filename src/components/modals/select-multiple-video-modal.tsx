import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { cn } from "@/lib/utils";
import { FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useFormContext } from "react-hook-form";
import { IAPIResponse, IVideo } from "@/types";
import { Checkbox } from "../ui/checkbox";
import UpTubeImage from "../uptube/uptube-image";
import { useFetch } from "@/utils/reactQuery";
import { apiRoutes } from "@/utils/routes";
import { Typography } from "../ui/typography";

type Props = {
  trigger: React.ReactNode;
  className?: string;
  name: string;
};
function SelectMultipleVideoModal({ trigger, className, name }: Props) {
  const form = useFormContext();
  const { data, isLoading } = useFetch<IAPIResponse<IVideo[]>>(
    apiRoutes.videos.getAllUserContentByType,
  );
  if (isLoading) return <div>loading...</div>;
  const vidoes = (data?.data || []) as IVideo[];

  return (
    <Dialog>
      <DialogTrigger className="w-max">{trigger}</DialogTrigger>
      <DialogContent
        className={cn(
          "p-0 max-h-[90vh] rounded-none sm:rounded-none scroll overflow-y-auto",
          className,
        )}
      >
        <DialogHeader className="p-6 pb-0">
          <DialogTitle>Add Videos</DialogTitle>
        </DialogHeader>
        {vidoes?.length <= 0 ? (
          <Typography>No videos</Typography>
        ) : (
          <FormField
            control={form.control}
            name={name}
            render={() => (
              <FormItem>
                {vidoes.map((item) => (
                  <FormField
                    key={item._id}
                    control={form.control}
                    name={name}
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item._id}
                          className="px-6  py-4 flex flex-row items-center space-x-4 space-y-0 border-y last:border-b-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(item._id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item._id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value: string) => value !== item._id,
                                      ),
                                    );
                              }}
                            />
                          </FormControl>
                          <div className="flex gap-3 items-center">
                            <div className="w-10 aspect-video relative overflow-hidden">
                              <UpTubeImage
                                src={item.thumbnail}
                                alt={item.title}
                              />
                            </div>
                            <FormLabel className="font-normal w-[200px] truncate text-secondary">
                              {item.title}
                            </FormLabel>
                          </div>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </FormItem>
            )}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}

export default SelectMultipleVideoModal;
