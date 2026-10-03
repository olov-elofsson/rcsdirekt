import{createFileRoute}from"@tanstack/react-router";

import{DetailPage}from"@/components/SiteLayout";
import{LeadForm}from"@/components/LeadForm";

exportconstRoute=createFileRoute("/kontakt")({
head:()=>({
meta:[
{title:"KontaktaossomRCSförföretag|"},
{name:"description",content:"FrågoromattskickaRCS,API-tillgångellerpriser?Kontaktasåhjälperviertföretagigång."},
{property:"og:title",content:"KontaktaossomRCSförföretag|"},
{property:"og:description",content:"FrågoromattskickaRCS,API-tillgångellerpriser?Kontaktasåhjälperviertföretagigång."},
{property:"og:type",content:"website"},{property:"og:url",content:"https://rcsdirekt.se/kontakt"},
{name:"twitter:card",content:"summary_large_image"},
],
links:[{rel:"canonical",href:"https://rcsdirekt.se/kontakt"}],
}),
component:()=>(
<DetailPagetitle="Pratamedoss"intro="FrågoromRCS,API-tillgångellervilkenmeddelandetypsompassar?Skrivnågraradersååterkommervi.">
<LeadFormmode="contact"/>
</DetailPage>
),
});
