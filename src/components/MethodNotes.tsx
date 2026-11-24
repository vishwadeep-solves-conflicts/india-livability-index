import SectionHead from "./SectionHead";

export default function MethodNotes() {
  return (
    <section>
      <SectionHead title="Method and limits" />
      <div className="method">
        <div>
          <h3>How scores are built</h3>
          <ul>
            <li>
              Each factor is a 1–10 rating drawn from public indicators available through mid-2026. Examples include CPCB
              air quality, NCRB crime rates, the TomTom traffic index, Swachh Survekshan ranks, Ookla speeds, IMD climate
              normals, NIRF institutions, and rent and price trackers.
            </li>
            <li>A persona score is the weighted average of the 17 factor ratings, scaled to 100.</li>
            <li>
              Weights show what each persona cares about. For example, retirees put 18% on healthcare and 0% on jobs, while
              remote workers put 15% on internet and 0% on commute.
            </li>
          </ul>
        </div>
        <div>
          <h3>Read with care</h3>
          <ul>
            <li>
              <b>Ratings are judgments, not live data.</b> They compress many sources into one number, and they will drift
              as conditions change, such as new metro lines or water shortages.
            </li>
            <li>
              <b>Crime data has reporting bias.</b> Cities where more people report crimes can look less safe than they are.
            </li>
            <li>
              <b>City boundaries vary.</b> Delhi, Gurugram and Noida are scored separately even though many people live in
              one and work in another.
            </li>
            <li>
              <b>Smaller cities score well when jobs carry little weight.</b> For remote workers and retirees, smaller cities
              rank high because jobs barely count. That reverses quickly for anyone who needs a local job.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
