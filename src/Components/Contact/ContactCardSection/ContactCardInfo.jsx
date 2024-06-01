import { useTranslation } from "react-i18next";
import s from "./ContactCardInfo.module.scss";
import ContactInfo from "./ContactInfo";

const ContactInfoCard = () => {
  const { t } = useTranslation();
  const contactInfo = "contactPage.contactInfoCard";
  const phoneSectionTitle = t(`${contactInfo}.phoneSection.title`);
  const weAreAvailableTrans = t(`${contactInfo}.phoneSection.weAreAvailable`);
  const phoneTrans = t(`${contactInfo}.phoneSection.phoneNumber`);

  const emailSectionTitle = t(`${contactInfo}.emailSection.title`);
  const fillOutTrans = t(`${contactInfo}.emailSection.fillOut`);
  const emailTrans = t(`${contactInfo}.emailSection.email`);

  return (
    <section className={s.contactInfo}>
      <ContactInfo iconName="phone" title={phoneSectionTitle}>
        <p>{weAreAvailableTrans}</p>
        <p>
          {phoneTrans + ": "}
          <a href="tel:+91 XXXXXXXXXX">+91 XXXXXXXXXX</a>
        </p>
      </ContactInfo>

      <div className={s.horizontalLine} />

      <ContactInfo iconName="email2" title={emailSectionTitle}>
        <p>{fillOutTrans}</p>
        <p>
          {emailTrans + ": "}
          <a href="mailto:customer@gmail.com">customer@gmail.com</a>
        </p>

        <p>
          {emailTrans + ": "}
          <a href="mailto:info@gmail.com">info@gmail.com</a>
        </p>
      </ContactInfo>
    </section>
  );
};

export default ContactInfoCard;
