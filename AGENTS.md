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

- Video exports use a private storage bucket through validated same-host server upload and streaming routes; service-only upload logs and an atomic database limit prevent concurrent quota bypass without requiring accounts.
- Keep the exported video blob in a component ref and share one upload function between export and retry so retries never rerender the video.
- Keep site button geometry and interaction states in the shared Button variants, not page-specific overrides, so all pages stay consistent; miniature phone-demo controls retain their contextual sizes.
- Use the shared PageHeading for content-page introductions so heading scale, alignment, background treatment and spacing stay consistent with pricing.

- Visuell arkitektur: använd en luftig, 46elks-inspirerad produktberättelse med vit bas och ett vitt och blått brandkit (#EFEEFC / #F5F5FC / #15115F); orange/persika ska inte förekomma, eftersom tjänsten ska kännas enkel, rak och mänsklig.
- Sidstruktur: återanvänd SiteHeader på alla sidor och SiteLayout för offentliga undersidor så att sidhuvud, sidfot och innehållsbredd hålls konsekventa.
- Produktsidor: använd korta, skannbara funktionsöversikter och märk ännu ej anslutna tjänster som kommande eller kontoaktiverade för att undvika felaktiga produktlöften.
- Meddelandetyper: det finns ingen jämförelsesida och inga egna undersidor för RCS Basic, Single och Conversation; de beskrivs i bloggartikeln rcs-basic-single-conversation. Gamla länkar till /jamfor-planer vidarebefordras till startsidan. Uppmuntra inte nya länkar till en samlad jämförelsesida.
- RCS-demonstration: håll startsidans telefon och allt redigerbart demoinnehåll separerade i en komponent och datafil så upplevelsen kan utvecklas utan att belasta sidrutten.
- Knowledge content uses browser-safe typed data with individually edited summaries and prose composed before search and rendering, without automatically appended examples; shared single-column views and synchronous lookup loaders keep citations, search and reading estimates consistent, and glossary entries reuse exact-match dedicated articles.
- The blog is the single discovery route for guides and glossary articles; permanently redirect the legacy /ordlista URL to /blogg to preserve existing links.
- Illustrative company RCS scenarios live in a browser-safe data module and a dedicated homepage section; label them as examples rather than verified customer results.
- Modals use a plain React-controlled element with role="dialog" and aria-modal, avoiding a newly optimized dialog dependency that can split the preview's React module graph.
- Homepage visual refinements are scoped under `.home-refined`; each background transition is owned by the incoming section, so shared components, other routes and phone behavior remain unchanged.
- Large editorial expansions live in separate browser-safe article and source modules composed into the shared collection; keep an explicit keyword-intent map and count regression test to prevent accidental duplicate or missing articles.
- Compose individually authored per-slug article depth and typed primary-source findings before reading-time calculation and rendering; distinguish publisher documentation from measured customer results to avoid fabricated first-party evidence.
