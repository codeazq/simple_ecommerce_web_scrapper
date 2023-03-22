module.exports = {
  productsURL: "https://sosogames.com.ng/shop/?orderby=date&per_page=9",

  productUrlSelector: ".product-grid-item .product-element-top > a",

  productTitleSelectorH1: "div.summary-inner > h1.product_title.entry-title",

  productPriceSelectorForBdiElement:
    "div.summary-inner > p.price > span.woocommerce-Price-amount.amount > bdi",

  productShortDescSelectorDiv:
    "div.woocommerce-product-details__short-description",

  productImageUrl:
    "div.product-image-wrap > figure.woocommerce-product-gallery__image > img",

  productImagesUrls: "div.owl-item > div.product-image-thumbnail > img",
};
