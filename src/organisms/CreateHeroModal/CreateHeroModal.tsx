import { useEffect, type FC } from "react";
import styles from "./CreateHeroModal.module.css";

// icons
import CloseIcon from "../../assets/images/close.svg?react";
import UICloseBtn from "../../atoms/UICloseBtn/UICloseBtn";
import { UIFileInput, UIInput } from "../../atoms/UIInput/UIInput";
import { UITextarea } from "../../atoms/UITextarea/UITextarea";
import { useForm } from "react-hook-form";
import { useCreateMutation } from "../../api/heroApi";

interface CreateHeroModalProps {
  setShowCreateHeroModal: (arg: boolean) => void;
}

const CreateHeroModal: FC<CreateHeroModalProps> = ({
  setShowCreateHeroModal,
}) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [createHero, { isSuccess, isLoading, isError, error }] =
    useCreateMutation();

  const onSubmit = async (data: any) => {
    const formData = new FormData();

    formData.append("nickname", data?.nickname);
    formData.append("real_name", data?.real_name);
    formData.append("origin_description", data?.origin_description);
    formData.append("superpowers", data?.superpowers);
    formData.append("catch_phrase", data?.catch_phrase);

    if (data.images && data.images.length) {
      Array.from(data.images as FileList).forEach((file) => {
        formData.append("images", file);
      });
    }

    await createHero(formData);
  };

  useEffect(() => {
    if (!isLoading && isSuccess) {
      reset();
    }
  }, [isSuccess, isLoading]);

  return (
    <div className={styles["modal-bg"]}>
      <form className={styles["modal"]} onSubmit={handleSubmit(onSubmit)}>
        <UICloseBtn
          onClick={() => setShowCreateHeroModal(false)}
          className={styles["close-btn"]}
        >
          <CloseIcon />
        </UICloseBtn>

        <UIInput
          placeholder="Superman"
          label="Nickname"
          className={styles["input"]}
          type="text"
          id="nickname"
          {...register("nickname", {
            required: "Nickname is required",
            minLength: { value: 3, message: "Minimum 3 characters" },
          })}
        />
        {errors.nickname?.message && (
          <p className={styles["error"]}>{String(errors.nickname.message)}</p>
        )}

        <UIInput
          placeholder="Clark Kent"
          label="Real Name"
          className={styles["input"]}
          type="text"
          id="real_name"
          {...register("real_name", {
            required: "Real name is required",
            minLength: { value: 3, message: "Minimum 3 characters" },
          })}
        />
        {errors.real_name?.message && (
          <p className={styles["error"]}>{String(errors.real_name.message)}</p>
        )}

        <UITextarea
          placeholder="Origin description..."
          label="Origin Description"
          className={styles["input"]}
          id="origin_description"
          {...register("origin_description", {
            required: "Origin description is required",
            minLength: { value: 10, message: "Minimum 10 characters" },
          })}
        />
        {errors.origin_description?.message && (
          <p className={styles["error"]}>
            {String(errors.origin_description.message)}
          </p>
        )}

        <UITextarea
          label="Superpowers"
          placeholder="List of superpowers"
          className={styles["input"]}
          id="superpowers"
          {...register("superpowers", {
            required: "Superpowers are required",
            minLength: { value: 5, message: "Minimum 5 characters" },
          })}
        />
        {errors.superpowers?.message && (
          <p className={styles["error"]}>
            {String(errors.superpowers.message)}
          </p>
        )}

        <UITextarea
          id="catch_phrase"
          placeholder="Catchphrase"
          label="Catch Phrase"
          className={styles["input"]}
          {...register("catch_phrase", {
            required: "Catch phrase is required",
            minLength: { value: 5, message: "Minimum 5 characters" },
          })}
        />
        {errors.catch_phrase?.message && (
          <p className={styles["error"]}>
            {String(errors.catch_phrase.message)}
          </p>
        )}
        <UIFileInput
          label=""
          className={styles["input-file"]}
          type="file"
          multiple
          accept="image/png, image/jpeg, image/webp"
          {...register("images")}
        />
        {isError && error && (
          <div className={styles["error-message"]}>
            {(error as { data: { message: string } })?.data?.message}
          </div>
        )}

        <button className={styles["submit-btn"]} type="submit">
          Submit
        </button>
      </form>
    </div>
  );
};

export default CreateHeroModal;
