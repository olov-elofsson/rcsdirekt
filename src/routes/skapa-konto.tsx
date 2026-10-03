import{createFileRoute,Link}from"@tanstack/react-router";
import{useState,typeFormEvent}from"react";
import{z}from"zod";
import{Check,Github,KeyRound}from"lucide-react";

import{SiteHeader}from"@/components/SiteLayout";
import{Button}from"@/components/ui/button";
import{Input}from"@/components/ui/input";
import{Label}from"@/components/ui/label";

exportconstRoute=createFileRoute("/skapa-konto")({
head:()=>({
meta:[
{title:"SkapakontoochskickaRCS|"},
{name:"description",content:"SkapaettkontoochbörjaskickaRCSförertföretag.Ingastartavgifter,ingamånadskostnader.Betalapermeddelande."},
{property:"og:title",content:"SkapakontoochskickaRCS|"},
{property:"og:description",content:"SkapaettkontoochbörjaskickaRCSförertföretag.Ingastartavgifter,ingamånadskostnader.Betalapermeddelande."},
{property:"og:type",content:"website"},{property:"og:url",content:"https://rcsdirekt.se/skapa-konto"},
{name:"twitter:card",content:"summary_large_image"},
],
links:[{rel:"canonical",href:"https://rcsdirekt.se/skapa-konto"}],
}),
component:SignupPage,
});

constemailSchema=z.string().trim().email("Angeengiltige-postadress").max(255);

functionGoogleMark(){
return(
<svgaria-hiddenviewBox="002424"className="size-5">
<pathfill="#4285F4"d="M23.512.3c0-.9-.1-1.5-.3-2.2H12v4.1h6.5c-.11.1-.82.7-2.43.8l-.02.153.52.7.24.03c2.2-23.5-53.5-8.6Z"/>
<pathfill="#34A853"d="M1224c3.205.9-17.9-2.9l-3.8-2.9c-1.7-2.41.2-4.11.2-3.10-5.8-2.1-6.7-5l-.14.01-3.12.4-.04.11C421.37.7241224Z"/>
<pathfill="#FBBC05"d="M5.314.4c-.24-.7-.38-1.5-.38-2.4s.14-1.7.36-2.4l-.01-.16-3.14-2.4-.1.05A1212000012c01.9.53.71.35.3l4-2.9Z"/>
<pathfill="#EA4335"d="M124.6c2.303.814.71.8l3.4-3.3C181.215.201207.7042.726.7l3.32.6c.9-2.93.6-4.76.7-4.7Z"/>
</svg>
);
}

functionSignupPage(){
const[error,setError]=useState("");
const[sent,setSent]=useState(false);

functiononSubmit(e:FormEvent<HTMLFormElement>){
e.preventDefault();
constemail=String(newFormData(e.currentTarget).get("email")??"");
constresult=emailSchema.safeParse(email);
if(!result.success){
setError(result.error.issues[0]?.message??"Angeengiltige-postadress");
return;
}
setError("");
setSent(true);
}

return(
<divclassName="flexmin-h-screenflex-colbg-primary-soft">
<SiteHeader/>

<mainclassName="flexflex-1items-centerjustify-centerpx-5py-10">
<divclassName="w-fullmax-w-mdrounded-[2rem]borderborder-borderbg-cardp-8shadow-cardsm:p-10">
{sent?(
<divclassName="text-center">
<spanclassName="mx-autogridsize-12place-items-centerrounded-fullbg-primary-softring-1ring-border/60"><CheckclassName="size-5"/></span>
<h1className="mt-5text-2xlfont-extraboldtracking-tight">Tackfördinregistrering!</h1>
<pclassName="mt-3text-muted-foreground">Vihöravossinomkortmednästastegförattaktiveradittkonto.</p>
</div>
):(
<>
<h1className="text-2xlfont-extraboldtracking-tightsm:text-3xl">Skapadittkonto</h1>
<pclassName="mt-2text-smtext-muted-foreground">Harduredanettkonto?<ahref="/skapa-konto"className="font-semiboldtext-primaryunderlineunderline-offset-4">Loggain</a></p>

<formnoValidateonSubmit={onSubmit}className="mt-7space-y-3">
<divclassName="space-y-2">
<LabelhtmlFor="email">E-post</Label>
<Inputid="email"name="email"type="email"autoComplete="email"placeholder="namn@foretag.se"className="h-12rounded-xlbg-background"aria-invalid={!!error}/>
{error?<pclassName="text-xsfont-semiboldtext-destructive">{error}</p>:null}
</div>
<Buttontype="submit"size="lg"className="w-full">Fortsätt</Button>
</form>

<divclassName="my-7flexitems-centergap-4text-xsfont-semibolduppercasetracking-widertext-muted-foreground">
<spanclassName="h-pxflex-1bg-border"/>eller<spanclassName="h-pxflex-1bg-border"/>
</div>

<divclassName="space-y-3">
<Buttontype="button"variant="outline"size="lg"className="w-fulljustify-centergap-3"><GoogleMark/>FortsättmedGoogle</Button>
<Buttontype="button"variant="outline"size="lg"className="w-fulljustify-centergap-3"><GithubclassName="size-5"/>FortsättmedGitHub</Button>
<Buttontype="button"variant="outline"size="lg"className="w-fulljustify-centergap-3"><KeyRoundclassName="size-5"/>FortsättmedSSO</Button>
</div>

<pclassName="mt-7text-centertext-xsleading-relaxedtext-muted-foreground">Ingamånadskostnader,ingastartavgifterochingabindningstider.</p>
</>
)}
</div>
</main>

<footerclassName="mx-autoflexw-fullmax-w-6xlitems-centerjustify-betweenpx-5py-6text-xstext-muted-foregroundlg:px-8">
<span>©{newDate().getFullYear()}</span>
<spanclassName="flexgap-5">
<ahref="/#kontakt"className="font-semiboldunderlineunderline-offset-4hover:text-foreground">Villkor</a>
<ahref="/#kontakt"className="font-semiboldunderlineunderline-offset-4hover:text-foreground">Integritet</a>
<ahref="/#kontakt"className="font-semiboldunderlineunderline-offset-4hover:text-foreground">Kontaktaoss</a>
</span>
</footer>
</div>
);
}
