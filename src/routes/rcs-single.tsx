import{createFileRoute}from"@tanstack/react-router";

import{PricingDetailPage}from"@/components/PricingDetailPage";
import{pricingPlans}from"@/data/pricing-plans";

exportconstRoute=createFileRoute("/rcs-single")({
head:()=>({meta:[{title:"RCSSingle0,425SEK:rikaRCS-utskick|"},{name:"description",content:"RCSSingleförföretag:skickaRCSmedbilder,video,karusellerochknapparför0,425SEKst.Ingamånadskostnader."},{property:"og:title",content:"RCSSingle0,425SEK:rikaRCS-utskick|"},{property:"og:description",content:"RCSSingleförföretag:skickaRCSmedbilder,video,karusellerochknapparför0,425SEKst.Ingamånadskostnader."},{property:"og:type",content:"website"},{property:"og:url",content:"https://rcsdirekt.se/rcs-single"},{name:"twitter:card",content:"summary_large_image"}],links:[{rel:"canonical",href:"https://rcsdirekt.se/rcs-single"}]}),
component:()=><PricingDetailPageplan={pricingPlans[1]}/>,
});