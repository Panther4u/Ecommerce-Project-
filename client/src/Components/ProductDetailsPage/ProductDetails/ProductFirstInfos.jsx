import { useTranslation } from "react-i18next";
import RateStars from "../../Shared/MidComponents/RateStars/RateStars";
import s from "./ProductFirstInfos.module.scss";

const ProductFirstInfos = ({ data }) => {
  const { shortName, price, votes, rate, description } = data;
  const { t } = useTranslation();

  function translateProduct(key, dynamicData = {}) {
    const shortNameKey = shortName.replaceAll("", "");
    const productTrans = `${shortNameKey}`;
    const translateText = t(`${productTrans}${key}`, dynamicData);
    return  translateText;
  }

  return (
    <section className={s.firstInfos}>
      <b className={s.productName}>{translateProduct("", true)}</b>

      <section className={s.rateAndReviews}>
        <RateStars rate={rate} />
        <span className={s.reviews}>{t("detailsPage.reviews", { votes })}</span>
        <div className={s.verticalLine} />
        <span className={s.greenText}>{t("detailsPage.inStock")}</span>
      </section>

      <span className={s.price}>Rs.{price} /-</span>

      <p className={s.description}>{description}</p>
    </section>
  );
};

export default ProductFirstInfos;
