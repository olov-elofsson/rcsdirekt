<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Visuell arkitektur: använd en luftig, 46elks-inspirerad produktberättelse med vit bas och monokrom svartvit design; orange/persika får enbart förekomma i logotypen, inte i gränssnittet, eftersom tjänsten ska kännas enkel, rak och mänsklig.
- Sidstruktur: återanvänd SiteHeader på alla sidor och SiteLayout för offentliga undersidor så att sidhuvud, sidfot och innehållsbredd hålls konsekventa.
- Produktsidor: använd korta, skannbara funktionsöversikter och märk ännu ej anslutna tjänster som kommande eller kontoaktiverade för att undvika felaktiga produktlöften.
- Meddelandetyper: det finns ingen jämförelsesida; RCS Basic, Single och Conversation lever bara på sina egna undersidor (/rcs-basic, /rcs-single, /rcs-conversation). Gamla länkar till /jamfor-planer vidarebefordras till startsidan. Uppmuntra inte nya länkar till en samlad jämförelsesida.
- RCS-demonstration: håll startsidans telefon och allt redigerbart demoinnehåll separerade i en komponent och datafil så upplevelsen kan utvecklas utan att belasta sidrutten.
- Knowledge content lives in a browser-safe typed data module, with shared article and glossary views and synchronous lookup loaders; this keeps source citations, related links and searchable content consistent without requiring a backend.
