import{createFileRoute}from"@tanstack/react-router";

import{PricingDetailPage}from"@/components/PricingDetailPage";
import{pricingPlans}from"@/data/pricing-plans";

exportconstRoute=createFileRoute("/rcs-conversation")({
head:()=>({meta:[{title:"RCSConversation0,63SEK:RCS-dialog|"},{name:"description",content:"RCSConversationförföretag:tvåvägsdialogmedkunderimeddelandeappenför0,63SEKst.Ingamånadskostnader."},{property:"og:title",content:"RCSConversation0,63SEK:RCS-dialog|"},{property:"og:description",content:"RCSConversationförföretag:tvåvägsdialogmedkunderimeddelandeappenför0,63SEKst.Ingamånadskostnader."},{property:"og:type",content:"website"},{property:"og:url",content:"https://rcsdirekt.se/rcs-conversation"},{name:"twitter:card",content:"summary_large_image"}],links:[{rel:"canonical",href:"https://rcsdirekt.se/rcs-conversation"}]}),
component:()=><PricingDetailPageplan={pricingPlans[2]}/>,
});