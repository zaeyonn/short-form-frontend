import { useEffect } from "react";

const ReviewList1 = ({ productImage, productName, productPrice, reviewList }) => {
  useEffect(() => {
    const googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "ko",
          includedLanguages: "ja,en",
          layout: window.google.translate.TranslateElement.InlineLayout.HORIZONTAL,
          autoDisplay: true,
        },
        "google_translate_element"
      );
    };

    const script = document.createElement("script");
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    //window.googleTranslateElementInit = googleTranslateElementInit;
    googleTranslateElementInit()
  }, []);

  useEffect(() => {
    setTimeout(() => {
      const selectElement = document.querySelector(".goog-te-combo");
      if (selectElement) {
        selectElement.value = "ja";
        selectElement.dispatchEvent(new Event("change"));
      }
    }, 1000);
  }, []);

  return (
    <div>
      <div className="product-info-wrap">
        <img src={productImage} alt="Product" />
        <div className="product-detail">
          <div className="product-name">{productName}</div>
          <div className="product-price">￥{productPrice}</div>
        </div>
      </div>
      <ul className="review-list">
        <div id="google_translate_element"></div>
        {reviewList.length > 0 ? (
          reviewList.map((review, index) => (
            <li className="review-item" key={index}>
              <div className="score">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    className="star"
                    src={i < review.score ? "/images/icon-star.svg" : "/images/icon-empty-star.svg"}
                    alt="star"
                  />
                ))}
              </div>
              <div className="name">
                {review.user_name.charAt(0) + "*".repeat(review.user_name.length - 1)}
              </div>
              <div className="message">{review.message}</div>
            </li>
          ))
        ) : (
          <div className="no-review">レビューはまだありません</div>
        )}
      </ul>
    </div>
  );
};

export default ReviewList1;
