import Stripe from "stripe";
type StripeCountryCode =
  Stripe.Checkout.SessionCreateParams.ShippingAddressCollection.AllowedCountry;

export const STRIPE_COUNTRY_CODES: StripeCountryCode[] = [
  "AE",
  "AT",
  "AU",
  "BE",
  "BG",
  "BR",
  "CA",
  "CH",
  "CY",
  "CZ",
  "DE",
  "DK",
  "EE",
  "FI",
  "FR",
  "GB",
  "GH",
  "GR",
  "HK",
  "HR",
  "HU",
  "ID",
  "IE",
  "IN",
  "IT",
  "JP",
  "KE",
  "LI",
  "LT",
  "LU",
  "LV",
  "MT",
  "MX",
  "MY",
  "NG",
  "NL",
  "NO",
  "NZ",
  "PL",
  "PT",
  "RO",
  "SE",
  "SG",
  "TH",
  "US",
  "ZA",
];
