import React from "react";
import * as Yup from "yup";
import { Form, Formik } from "formik";
import styles from "./SocialInput.module.scss";
import Button from "../Button/Button";
import { Input } from "../Formik/FormikFields";
import { GobalLink, socialMedia } from "../../Services/api.service";
import toast from "react-hot-toast";
import {
  setTelegarm,
  setTwitter,
  setWhatapps,
  setfacebook,
} from "../../../redux/features/reducers/user.slice";
import { useDispatch } from "react-redux";
import { disabledLetters } from "../../Services/Helper";

const SocialInput = (props: any) => {
  const dispatch: any = useDispatch();
  const initialValues = {
    text: "",
  };

  const validationSchema = Yup.object().shape({
    text: Yup.string().required("This field is required"),
  });

  const handleKeyDown = (evt: React.KeyboardEvent<HTMLInputElement>) => {
    if (["ArrowUp", "ArrowDown"].includes(evt.key)) {
      evt.preventDefault();
    }
    if (disabledLetters.includes(evt.key)) {
      evt.preventDefault();
    }
  };

  const handleMedialink = async (value: string, data: any, formik: any) => {
    try {
      if (data?.type === "whatapps") formik.setFieldValue("text", value);
      else if (data?.type === "Twitter") formik.setFieldValue("text", value);
      else if (data?.type === "facebook") formik.setFieldValue("text", value);
      else if (data?.type === "telegram") formik.setFieldValue("text", value);

      const data1 = {
        whatsAppLink: data?.type === "whatapps" ? value : "",
        twitterLink: data?.type === "Twitter" ? value : "",
        facebookLink: data?.type === "facebook" ? value : "",
        telegramLink: data?.type === "telegram" ? value : "",
      };

      const socialmediaRes: any = await socialMedia(data1);
      toast.success(`${data?.type} Link submitted successfully`);
      formik.resetForm();

      formik.setFieldValue("text", "");
      const res = await GobalLink();

      const GetLINK = res?.data?.data[0];

      if (GetLINK) {
        dispatch(setfacebook(data?.facebookLink));
        dispatch(setWhatapps(data?.whatsAppLink));
        dispatch(setTwitter(data?.twitterLink));
        dispatch(setTelegarm(data?.telegramLink));
      }
    } catch (error) {
      formik.setFieldValue("text", "");
    }
  };

  const onSubmit = async (values: any, formik: any) => {
    try {
      if (values?.text) {
        await handleMedialink(values?.text, props?.data, formik);
      }
    } catch (error) {
      // console.log(error, "errorInCaseOfHandleMediaLink");
    }
  };

  return (
    <div className={` ${styles.socialmedia_box} ${props.className}`}>
      <div className={styles.icon_img}>{props.icon}</div>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {(formik) => (
          <Form>
            <Input
              label=""
              placeholder={props.placeholder}
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.text}
              formik={formik}
              name="text"
              rightAction
              className={styles.inner_input}
              onKeyDown={handleKeyDown}
            />
            <Button
              text="Submit"
              className={styles.soacial_btn}
              type="submit"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default SocialInput;
