import{createFileRoute}from"@tanstack/react-router";

import{PricingDetailPage}from"@/components/PricingDetailPage";
import{pricingPlans}from"@/data/pricing-plans";

exportconstRoute=createFileRoute("/rcs-basic")({
head:()=>({meta:[{title:"RCSBasic0,30SEK:skickakortaRCS|"},{name:"description",content:"RCSBasicförföretag:kortaverifieradeRCS-meddelandenför0,30SEKst.Ingamånadskostnaderellerbindningstider."},{property:"og:title",content:"RCSBasic0,30SEK:skickakortaRCS|"},{property:"og:description",content:"RCSBasicförföretag:kortaverifieradeRCS-meddelandenför0,30SEKst.Ingamånadskostnaderellerbindningstider."},{property:"og:type",content:"website"},{property:"og:url",content:"https://rcsdirekt.se/rcs-basic"},{name:"twitter:card",content:"summary_large_image"}],links:[{rel:"canonical",href:"https://rcsdirekt.se/rcs-basic"}]}),
component:()=><PricingDetailPageplan={pricingPlans[0]}/>,
});