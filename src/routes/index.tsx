import{createFileRoute,Link}from"@tanstack/react-router";
import{ArrowRight,BarChart3,Check,Code2,Globe,TrendingUp,Wallet,X}from"lucide-react";

import{LeadForm}from"@/components/LeadForm";
import{InteractiveRcsDemo}from"@/components/InteractiveRcsDemo";
import{SiteFooter,SiteHeader}from"@/components/SiteLayout";
import{Button}from"@/components/ui/button";
import{pricingPlans}from"@/data/pricing-plans";
import{cn}from"@/lib/utils";

exportconstRoute=createFileRoute("/")({
head:()=>({meta:[
{title:"RCSförföretag:skickaRCSenkelt|"},
{name:"description",content:"SkickaRCSförföretagdirektfrånwebbenellerviaAPI.Bilder,knapparochverifieradavsändare.Från0,30SEKpermeddelande,ingamånadskostnader."},
{property:"og:title",content:"RCSförföretag:skickaRCSenkelt|"},
{property:"og:description",content:"SkickaRCSförföretagdirektfrånwebbenellerviaAPI.Bilder,knapparochverifieradavsändare.Från0,30SEKpermeddelande,ingamånadskostnader."},
{property:"og:type",content:"website"},{property:"og:url",content:"https://rcsdirekt.se/"},
{name:"twitter:card",content:"summary_large_image"},
],
links:[{rel:"canonical",href:"https://rcsdirekt.se/"}],
scripts:[{type:"application/ld+json",children:JSON.stringify({"@context":"https://schema.org","@type":"Organization","name":"RCSDirekt","url":"https://rcsdirekt.se/","logo":"https://rcsdirekt.se/favicon.svg","description":"RCSförföretag.SkickaRCSfrånwebbenellerviaAPI."})}],
}),
component:Index,
});

constassistedHref="/skapa-konto";

functionIndex(){
return<divclassName="min-h-screenbg-backgroundtext-foreground"><SiteHeader/><main><HeroFirst/><Comparison/><Advantages/><WhatIsRcs/><Pricing/><ContactSection/></main><SiteFooter/></div>;
}

constsectionTitle="text-[2.1rem]font-extraboldleading-[1.05]tracking-[-0.026em]sm:text-[2.65rem]";

functionWave({fill,flip=false,className}:{fill:string;flip?:boolean;className?:string}){return<svgaria-hidden="true"className={cn("pointer-events-noneabsoluteinset-x-0z-0h-14w-fullsm:h-20lg:h-28",flip?"-top-pxrotate-180":"-bottom-px",className)}viewBox="001440120"preserveAspectRatio="none"><pathd="M062C24012480672038C960701200110144054L1440120L0120Z"fill={fill}/></svg>;}

functionDualCtas({dark=false}:{dark?:boolean}){return<divclassName="flexflex-colgap-3sm:flex-row"><ButtonasChildsize="lg"><ahref={assistedHref}>Skapakonto<ArrowRight/></a></Button><ButtonasChildsize="lg"variant={dark?"inverted":"outline"}><ahref="/kontakt">Pratamedoss</a></Button></div>;}

constwaysToSend=[
{icon:Globe,key:"Webb",label:"SkickaRCSonline",to:"/rcs-online"asconst,copy:"Loggainochskapakampanjendirektiwebbläsaren.Laddauppmottagare,läggtillbilder,textochknappar,förhandsgranskaochskicka.Ingatekniskaförkunskaperkrävs."},
{icon:Code2,key:"API",label:"RCSAPI",to:"/rcs-api"asconst,copy:"KopplaRCStilleraegnasystem,tillexempele-handel,bokningssystemellerCRM,viaRESTAPIochwebhooks.Orderbekräftelser,påminnelserocherbjudandenskickasdåautomatisktnärnågothänderhoser."},
];

functionWhatIsRcs(){
return<sectionid="vad-ar-rcs"className="relativeoverflow-hiddenbg-backgroundpt-24pb-24sm:pt-28sm:pb-28"><divaria-hiddenclassName="deco-dotspointer-events-noneabsoluteleft-8top-20h-56w-56opacity-[0.05]lg:left-16"/><divaria-hiddenclassName="deco-dotspointer-events-noneabsolutebottom-24right-8h-56w-56opacity-[0.05]lg:right-16"/><divclassName="mx-autogridmax-w-6xlitems-centergap-12px-5lg:grid-cols-[0.8fr_1.2fr]lg:gap-16lg:px-8"><divclassName="max-w-md"><h2className={sectionTitle}>Tvåsättattskicka</h2><pclassName="mt-5text-baseleading-relaxedtext-muted-foreground">BådavägarnaanvändersammaRCS-nätverk,sammaavsändareochsammaprispermeddelande.Skillnadenärvemsombyggermeddelandet,niellererasystem.</p></div><divclassName="rounded-[2rem]borderborder-border/70bg-cardp-8shadow-cardsm:p-10"><divclassName="griddivide-ydivide-border">{waysToSend.map(({icon:Icon,key,copy,to})=><Linkkey={key}to={to}className="groupflexitems-startgap-4py-5first:pt-0last:pb-0"><spanclassName="gridsize-10shrink-0place-items-centerrounded-fullbg-primary-softtext-primaryring-1ring-border/50"><IconclassName="size-4.5"/></span><divclassName="min-w-0flex-1"><spanclassName="flexitems-centerjustify-betweengap-3pt-2.5text-smfont-boldleading-5">{key}<ArrowRightclassName="size-4transition-transformgroup-hover:translate-x-1"/></span><pclassName="mt-2text-smleading-relaxedtext-muted-foreground">{copy}</p></div></Link>)}</div></div></div></section>;
}

constrcsAdvantages=[
{icon:TrendingUp,title:"Upptill35%klickfrekvens",copy:"RCS-meddelandengerbetydligthögreengagemangänettvanligttextutskick.Interaktivaknapparochriktinnehållfårkundernaattageradirekt."},
{icon:BarChart3,title:"Statistikirealtid",copy:"Följleverans,läsningarochklickmedanutskicketpågår.Sevadsomfungerarochjusteranästautskick."},
{icon:Wallet,title:"Merresultatförpengarna",copy:"Närflerkunderöppnar,klickarochsvararfårnimerutavsammabudget.Betalabarafördemeddelandensomfaktisktskickas."},
{icon:Globe,title:"Eninternationellstandard",copy:"RCSärenbranschstandardsomstödsavoperatörerochtelefontillverkarevärldenöver.Sammateknikfungeraroavsettvarerakunderfinns."},
];

constcomparisonRows:{label:string;sms:boolean|string;rcs:boolean|string}[]=[
{label:"Verifieradavsändare",sms:false,rcs:true},
{label:"Avsändarprofil",sms:"Endastnummer",rcs:"Namnochlogotyp"},
{label:"Teckenpermeddelande",sms:"160",rcs:"ca4000"},
{label:"Bilder,videoochkaruseller",sms:false,rcs:true},
{label:"Interaktivaknappar",sms:false,rcs:true},
{label:"Läskvittonirealtid",sms:false,rcs:true},
{label:"Analysochinsikter",sms:"Levererat",rcs:"Levererat,settochklick"},
{label:"AI-stöd",sms:"Ja,tillvissdel",rcs:"Ja"},
{label:"TillgänglighetiSverige",sms:"Allamobiler",rcs:"Android5.0+ochiOS27"},
{label:"Fungerarikundensvanligameddelandeapp",sms:true,rcs:true},
{label:"Installation",sms:true,rcs:true},
];

functionCompareCell({value,highlight}:{value:boolean|string;highlight:boolean}){
consttone=highlight?"text-logo-blush":"text-muted-foreground";
return<spanclassName={cn("flexjustify-centertext-centertext-[0.7rem]font-semiboldleading-snugsm:text-xs",tone)}>{typeofvalue==="boolean"?(value?<CheckclassName="size-5"/>:<XclassName="size-5text-muted-foreground/50"/>):value}</span>;
}

functionComparison(){
return<sectionclassName="relativeoverflow-hiddenbg-backgroundpt-20pb-20sm:pt-24sm:pb-24"><divaria-hiddenclassName="deco-dotspointer-events-noneabsoluteleft-8top-16h-56w-56opacity-[0.05]lg:left-16"/><divclassName="relativemx-automax-w-3xlpx-5lg:px-8"><divclassName="mx-automax-w-2xltext-center"><h2className={sectionTitle}>RCSjämförtmedSMS</h2><pclassName="mt-5text-baseleading-relaxedtext-muted-foreground">Bådahamnarikundensmeddelandeappochbetalaspermeddelande.Skillnadenärvadsomrymsivarjemeddelande.</p></div><divclassName="mt-10rounded-[2rem]borderborder-border/80bg-cardp-6shadow-cardsm:p-8"><divclassName="gridgrid-cols-[1fr_5.5rem_5.5rem]items-centergap-x-2sm:grid-cols-[1fr_9rem_9rem]"><spanaria-hidden/><spanclassName="text-centertext-xsfont-bolduppercasetracking-widetext-muted-foreground">SMS</span><spanclassName="text-centertext-xsfont-bolduppercasetracking-widetext-logo-blush">RCS</span></div><divclassName="mt-3divide-ydivide-border">{comparisonRows.map((row)=><divkey={row.label}className="gridgrid-cols-[1fr_5.5rem_5.5rem]items-centergap-x-2py-3sm:grid-cols-[1fr_9rem_9rem]"><spanclassName="text-smfont-semiboldleading-snug">{row.label}</span><CompareCellvalue={row.sms}highlight={false}/><CompareCellvalue={row.rcs}highlight={typeofrow.rcs==="string"}/></div>)}</div></div></div></section>;
}

functionAdvantages(){
return<sectionclassName="relativeoverflow-hiddenbg-primary-softpt-28pb-24sm:pt-36sm:pb-28"><WaveflipclassName="h-12sm:h-16lg:h-24"fill="var(--color-background)"/><divaria-hiddenclassName="deco-dotspointer-events-noneabsoluteleft-8top-36h-56w-56opacity-[0.08]lg:left-16"/><divaria-hiddenclassName="deco-dotspointer-events-noneabsolutebottom-28right-8h-56w-56opacity-[0.08]lg:right-16"/><divclassName="relativemx-automax-w-5xlpx-5lg:px-8"><divclassName="max-w-2xl"><h2className={sectionTitle}>FördelarnamedRCS</h2><pclassName="mt-5text-baseleading-relaxedtext-muted-foreground">MycketavdetsomgörRCSbrasynsredanidemonstrationen.Härärflersakersomdessutomgårattmäta.</p></div><divclassName="mt-12gridgap-5sm:grid-cols-2">{rcsAdvantages.map(({icon:Icon,title,copy})=><divkey={title}className="rounded-[2rem]borderborder-border/80bg-cardp-8shadow-cardtransition-allduration-300hover:-translate-y-1.5hover:border-foreground/25hover:shadow-lift"><spanclassName="gridsize-11place-items-centerrounded-fullbg-primary-softtext-primaryring-1ring-border/60"><IconclassName="size-5"/></span><h3className="mt-6text-lgfont-extraboldtracking-[-0.01em]">{title}</h3><pclassName="mt-2text-smleading-relaxedtext-muted-foreground">{copy}</p></div>)}</div><divclassName="mt-12flexjustify-center"><DualCtas/></div></div><Wavefill="var(--color-background)"className="h-10sm:h-14lg:h-20"/></section>;
}

functionPricing(){
return<sectionid="pris"className="relativebg-primary-softpt-28pb-24sm:pt-36sm:pb-28"><WaveflipclassName="h-12sm:h-16lg:h-24"fill="var(--color-background)"/><divaria-hiddenclassName="deco-dotspointer-events-noneabsoluteleft-8top-28h-52w-52opacity-[0.08]lg:left-16"/><divaria-hiddenclassName="deco-dotspointer-events-noneabsolutebottom-28right-8h-52w-52opacity-[0.08]lg:right-16"/><divclassName="relativemx-automax-w-6xlpx-5lg:px-8"><divclassName="mx-automax-w-2xltext-center"><h2className={sectionTitle}>Prispermeddelande</h2><pclassName="mt-5text-basefont-bold">Ingamånadskostnader</p><pclassName="mt-2text-smleading-relaxedtext-muted-foreground">Ingastartavgifterochingabindningstider.SkapadittkontoochskickadittförstaRCS-meddelandepåminuter.</p></div><divclassName="mt-12gridgap-5sm:grid-cols-3">{pricingPlans.map((plan)=><Linkkey={plan.name}to={plan.slug}className="grouprounded-[2rem]borderborder-border/80bg-cardp-8text-centershadow-cardtransition-allduration-300hover:-translate-y-1.5hover:border-foreground/25hover:shadow-lift"><pclassName="text-smfont-bold">{plan.name}</p><pclassName="mt-6text-[2.6rem]font-extraboldleading-nonetracking-[-0.03em]">{plan.price}</p><pclassName="mt-2text-xstext-muted-foreground">permeddelande</p></Link>)}</div><divclassName="mt-10text-center"><Linkto="/jamfor-planer"className="text-smfont-semiboldtext-foregroundunderlineunderline-offset-4transition-colorshover:text-logo-blush">Vilkenbehöverjag?</Link></div></div><Wavefill="var(--color-background)"className="h-10sm:h-14lg:h-20"/></section>;
}

functionHeroFirst(){return<sectionid="top"className="relativeoverflow-hiddenbg-background"><divaria-hiddenclassName="deco-dotspointer-events-noneabsoluteleft-10top-36h-56w-56opacity-[0.05]"/><divclassName="relativemx-automax-w-7xlpx-5pb-24pt-24text-centersm:pt-28lg:px-8"><h1className="mx-automax-w-4xltext-[2.75rem]font-extraboldleading-[0.98]tracking-[-0.035em]sm:text-6xllg:text-[5.5rem]">Ettenkeltsättatt<br/><spanclassName="text-logo-blue">skicka</span><spanclassName="text-logo-blue">RCS</span></h1><pclassName="mx-automt-7max-w-2xltext-lgleading-relaxedtext-muted-foregroundsm:text-xl">SkickaRCSdirektfrånwebbenellerintegreraeraegnasystemviaAPI,medenprissättningsompassarbådesmåochstoraprojekt.</p><divclassName="mt-10flexjustify-center"><DualCtas/></div><divclassName="mt-16"><InteractiveRcsDemo/></div></div></section>;}
functionContactSection(){return<sectionid="kontakt"className="relativeoverflow-hiddenbg-backgroundpb-28pt-24sm:pb-32sm:pt-28"><divaria-hiddenclassName="deco-dotspointer-events-noneabsoluteright-10top-16h-52w-52opacity-[0.06]"/><divclassName="relativemx-automax-w-3xlpx-5text-centerlg:px-8"><h2className={sectionTitle}>Pratamedoss</h2><pclassName="mx-automt-5max-w-xltext-baseleading-relaxedtext-muted-foreground">FrågoromRCS,API-tillgångellervilkenmeddelandetypsompassar?Skrivnågraradersååterkommervi.</p><divclassName="mt-10text-left"><LeadFormmode="contact"/></div></div></section>;}
