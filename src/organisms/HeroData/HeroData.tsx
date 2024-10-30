import { useEffect, type FC } from "react";
import { useForm } from "react-hook-form";
import { IHero } from "../../interfaces";

import styles from "./HeroData.module.css";
import { useChangeHeroMutation } from "../../api/heroApi";

interface HeroDataProps {
  data: IHero;
  changeMode: boolean;
  setChangeMode: (arg: boolean) => void;
}

interface FormData {
  real_name: string;
  origin_description: string;
  superpowers: string;
  catch_phrase: string;
}

const HeroData: FC<HeroDataProps> = ({ data, changeMode, setChangeMode }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm<FormData>({
    defaultValues: {
      real_name: data?.real_name,
      origin_description: data?.origin_description,
      superpowers: data?.superpowers,
      catch_phrase: data?.catch_phrase,
    },
  });

  const [changeData, { isSuccess }] = useChangeHeroMutation();

  const onSubmit = async (heroData: FormData) => {
    const filteredData = Object.fromEntries(
      Object.entries(heroData).filter(
        ([_, value]) =>
          value !== undefined &&
          (typeof value !== "string" || value.trim().length > 0)
      )
    );

    await changeData({ slug: data?.slug, heroData: filteredData });
  };

  useEffect(() => {
    if (isSuccess) {
      setChangeMode(false);
    }
  }, [isSuccess]);

  useEffect(() => {
    reset({
      real_name: data?.real_name,
      origin_description: data?.origin_description,
      superpowers: data?.superpowers,
      catch_phrase: data?.catch_phrase,
    });
  }, [data, reset]);

  return (
    <form className={styles["hero-data"]} onSubmit={handleSubmit(onSubmit)}>
      <ul className={styles.list}>
        <li>
          <span>Nickname:</span>
          <input type="text" disabled defaultValue={data?.nickname} />
        </li>
        <li>
          <span>Real Name:</span>
          <input
            {...register("real_name", {
              validate: (value) => {
                if (value.trim().length < 2) {
                  return "Real Name must be at least 2 characters.";
                }
                return true;
              },
            })}
            type="text"
            disabled={!changeMode}
            onChange={(e) => setValue("real_name", e.target.value)}
          />
          {errors.real_name && (
            <p className={styles["error"]}>{errors.real_name.message}</p>
          )}
        </li>
        <li>
          <span>Origin Description:</span>
          <textarea
            {...register("origin_description", {
              validate: (value) => {
                if (value.trim().length < 10) {
                  return "Origin Description must be at least 10 characters.";
                }
                return true;
              },
            })}
            disabled={!changeMode}
            onChange={(e) => setValue("origin_description", e.target.value)}
          />
          {errors.origin_description && (
            <p className={styles["error"]}>
              {errors.origin_description.message}
            </p>
          )}
        </li>
        <li>
          <span>Superpowers:</span>
          <textarea
            {...register("superpowers", {
              validate: (value) => {
                if (value.trim().length < 5) {
                  return "Superpowers must be at least 5 characters.";
                }
                return true;
              },
            })}
            disabled={!changeMode}
            onChange={(e) => setValue("superpowers", e.target.value)}
          />
          {errors.superpowers && (
            <p className={styles["error"]}>{errors.superpowers.message}</p>
          )}
        </li>
        <li>
          <span>Catch Phrase:</span>
          <textarea
            {...register("catch_phrase", {
              validate: (value) => {
                if (value.trim().length < 5) {
                  return "Catch Phrase must be at least 5 characters.";
                }
                return true;
              },
            })}
            disabled={!changeMode}
            onChange={(e) => setValue("catch_phrase", e.target.value)}
          />
          {errors.catch_phrase && (
            <p className={styles["error"]}>{errors.catch_phrase.message}</p>
          )}
        </li>
      </ul>
      {changeMode && <button className={styles["submit-btn"]}>Submit</button>}
    </form>
  );
};

export default HeroData;
