import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import {
  ArrowLeft, CheckCircle2, ClipboardList, Dna, Globe2, Microscope, ShieldCheck, Stethoscope, Waves,
  AlertTriangle, Users, FlaskConical, Syringe, Pill, HelpCircle, Bug, Clock, Info,
} from 'lucide-react';
import { api } from '@appdeploy/client';
import { diseases as staticDiseases, type Disease } from '../lib/data';
import DiseaseImage from '../components/DiseaseImage';

export default function DiseaseDetail() {
  const { id } = useParams();
  const [disease, setDisease] = useState<Disease | undefined>(() => staticDiseases.find((d) => d.id === id));
  const [checkedDb, setCheckedDb] = useState(false);

  useEffect(() => {
    const local = staticDiseases.find((d) => d.id === id);
    if (local) { setDisease(local); return; }
    let mounted = true;
    api.get('/api/diseases')
      .then((res) => {
        if (!mounted) return;
        const items: Disease[] = res.data?.items ?? [];
        setDisease(items.find((d) => d.id === id));
      })
      .finally(() => { if (mounted) setCheckedDb(true); });
    return () => { mounted = false; };
  }, [id]);

  if (!disease) {
    if (!checkedDb) {
      return <div className="section text-center text-sm text-slate-400">Loading disease profile…</div>;
    }
    return (
      <div className="section text-center">
        <p className="text-slate-600">Disease not found.</p>
        <Link to="/diseases" className="mt-4 inline-block text-teal-600">← Back to Disease Library</Link>
      </div>
    );
  }

  const isMalaria = disease.id === 'malaria';

  return (
    <div className="section">
      <Link to="/diseases" className="flex items-center gap-1 text-sm font-medium text-teal-600">
        <ArrowLeft className="h-4 w-4" /> Back to Disease Library
      </Link>

      <DiseaseImage diseaseId={disease.id} type="organism" className="mt-6 h-56 w-full rounded-2xl sm:h-72" />

      <div className="mt-6">
        <div className="flex flex-wrap gap-1.5">
          <span className="badge bg-slate-100 text-slate-600">{disease.category}</span>
          {disease.organismType && <span className="badge bg-slate-100 text-slate-600 capitalize">{disease.organismType}</span>}
          {disease.transmissionTags?.map((t) => (
            <span key={t} className="badge bg-teal-50 text-teal-700">{t}</span>
          ))}
        </div>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">{disease.name}</h1>
        {disease.scientificName && <p className="mt-1 text-sm italic text-slate-400">{disease.scientificName}</p>}
        {disease.commonNames && disease.commonNames.length > 0 && (
          <p className="mt-1 text-xs text-slate-400">Also known as: {disease.commonNames.join(', ')}</p>
        )}
        <p className="mt-3 max-w-3xl leading-relaxed text-slate-600">{disease.overview}</p>

        {disease.publicHealthRelevance && (
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-teal-100 bg-teal-50 px-4 py-3 text-sm text-teal-800">
            <Info className="mt-0.5 h-4 w-4 shrink-0" />
            <span>{disease.publicHealthRelevance}</span>
          </div>
        )}

        <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <p className="text-sm text-slate-500"><span className="font-semibold text-slate-700">Classification:</span> {disease.classification}</p>
          <p className="text-sm text-slate-500"><span className="font-semibold text-slate-700">Causative organism:</span> {disease.causativeOrganism}</p>
          {disease.incubationPeriod && (
            <p className="text-sm text-slate-500"><span className="font-semibold text-slate-700">Incubation period:</span> {disease.incubationPeriod}</p>
          )}
        </div>

        <p className="mt-3 text-xs text-slate-400">
          Reviewed by {disease.reviewedBy || 'HOTICE Immunotech'}
          {disease.lastReviewedDate ? ` · Last reviewed ${new Date(disease.lastReviewedDate).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}` : ''}
          {disease.contentStatus === 'needs-review' ? ' · Under review' : ''}
        </p>
      </div>

      <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <div className="card">
          <div className="flex items-center gap-2">
            <Microscope className="h-5 w-5 text-teal-600" />
            <h2 className="text-base font-semibold text-slate-900">Microbiology</h2>
          </div>
          <p className="mt-4 text-sm text-slate-600">{disease.microbiologyProfile}</p>
          {disease.morphology && <p className="mt-3 text-sm text-slate-600"><span className="font-semibold text-slate-700">Morphology:</span> {disease.morphology}</p>}
        </div>

        <div className="card">
          <div className="flex items-center gap-2">
            <Waves className="h-5 w-5 text-teal-600" />
            <h2 className="text-base font-semibold text-slate-900">Transmission</h2>
          </div>
          <p className="mt-4 text-sm text-slate-600">{disease.transmission}</p>
          {disease.vectors && disease.vectors.length > 0 && (
            <p className="mt-3 text-sm text-slate-600 flex gap-2"><Bug className="h-4 w-4 shrink-0 text-teal-600" /><span><span className="font-semibold text-slate-700">Vectors:</span> {disease.vectors.join(', ')}</span></p>
          )}
          {disease.reservoirs && disease.reservoirs.length > 0 && (
            <p className="mt-2 text-sm text-slate-600"><span className="font-semibold text-slate-700">Reservoirs:</span> {disease.reservoirs.join(', ')}</p>
          )}
          <DiseaseImage diseaseId={disease.id} type="transmission" className="mt-4 h-36 w-full rounded-xl" />
        </div>

        <div className="card">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-5 w-5 text-teal-600" />
            <h2 className="text-base font-semibold text-slate-900">Clinical Presentation</h2>
          </div>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Symptoms</p>
          <ul className="mt-1 space-y-1.5 text-sm text-slate-600">
            {disease.symptoms.map((s) => <li key={s} className="flex gap-2"><span>•</span>{s}</li>)}
          </ul>
          {disease.signs && disease.signs.length > 0 && (
            <>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Clinical Signs</p>
              <ul className="mt-1 space-y-1.5 text-sm text-slate-600">
                {disease.signs.map((s) => <li key={s} className="flex gap-2"><span>•</span>{s}</li>)}
              </ul>
            </>
          )}
        </div>

        <div className="card">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-teal-600" />
            <h2 className="text-base font-semibold text-slate-900">Complications &amp; Risk</h2>
          </div>
          {disease.complications && disease.complications.length > 0 && (
            <>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Complications</p>
              <ul className="mt-1 space-y-1.5 text-sm text-slate-600">
                {disease.complications.map((s) => <li key={s} className="flex gap-2"><span>•</span>{s}</li>)}
              </ul>
            </>
          )}
          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Risk Factors</p>
          <ul className="mt-1 space-y-1.5 text-sm text-slate-600">
            {disease.riskFactors.map((s) => <li key={s} className="flex gap-2"><span>•</span>{s}</li>)}
          </ul>
          {disease.vulnerablePopulations && disease.vulnerablePopulations.length > 0 && (
            <p className="mt-3 flex items-start gap-2 text-sm text-slate-600">
              <Users className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
              <span><span className="font-semibold text-slate-700">Most vulnerable:</span> {disease.vulnerablePopulations.join(', ')}</span>
            </p>
          )}
        </div>

        <div className="card">
          <div className="flex items-center gap-2">
            <Stethoscope className="h-5 w-5 text-teal-600" />
            <h2 className="text-base font-semibold text-slate-900">Diagnosis</h2>
          </div>
          <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Methods</p>
          <ul className="mt-1 space-y-1.5 text-sm text-slate-600">
            {disease.diagnosisMethods.map((s) => <li key={s} className="flex gap-2"><span>•</span>{s}</li>)}
          </ul>
          {disease.specimenTypes && disease.specimenTypes.length > 0 && (
            <p className="mt-3 flex items-start gap-2 text-sm text-slate-600">
              <FlaskConical className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
              <span><span className="font-semibold text-slate-700">Specimen types:</span> {disease.specimenTypes.join(', ')}</span>
            </p>
          )}
          {disease.identificationMethods && disease.identificationMethods.length > 0 && (
            <p className="mt-2 text-sm text-slate-600"><span className="font-semibold text-slate-700">Identification:</span> {disease.identificationMethods.join(', ')}</p>
          )}
        </div>

        <div className="card">
          <div className="flex items-center gap-2">
            <Globe2 className="h-5 w-5 text-teal-600" />
            <h2 className="text-base font-semibold text-slate-900">Epidemiology</h2>
          </div>
          <p className="mt-4 text-sm text-slate-600">{disease.epidemiology}</p>
          {disease.globalRelevance && <p className="mt-3 text-sm text-slate-600"><span className="font-semibold text-slate-700">Global relevance:</span> {disease.globalRelevance}</p>}
          {disease.nigeriaAfricaRelevance && <p className="mt-2 text-sm text-slate-600"><span className="font-semibold text-slate-700">Nigeria / Africa relevance:</span> {disease.nigeriaAfricaRelevance}</p>}
          {disease.outbreakInfo && <p className="mt-2 text-sm text-slate-600"><span className="font-semibold text-slate-700">Outbreak patterns:</span> {disease.outbreakInfo}</p>}
        </div>

        <div className="card">
          <div className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-teal-600" />
            <h2 className="text-base font-semibold text-slate-900">Prevention</h2>
          </div>
          <ul className="mt-4 space-y-1.5 text-sm text-slate-600">
            {disease.prevention.map((s) => <li key={s} className="flex gap-2"><span>•</span>{s}</li>)}
          </ul>
          {disease.vaccinationInfo && (
            <p className="mt-3 flex items-start gap-2 text-sm text-slate-600">
              <Syringe className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
              <span>{disease.vaccinationInfo}</span>
            </p>
          )}
          {disease.publicHealthControlMeasures && disease.publicHealthControlMeasures.length > 0 && (
            <>
              <p className="mt-3 text-xs font-semibold uppercase tracking-wide text-slate-400">Public health control measures</p>
              <ul className="mt-1 space-y-1.5 text-sm text-slate-600">
                {disease.publicHealthControlMeasures.map((s) => <li key={s} className="flex gap-2"><span>•</span>{s}</li>)}
              </ul>
            </>
          )}
          <DiseaseImage diseaseId={disease.id} type="prevention" className="mt-4 h-36 w-full rounded-xl" />
        </div>

        <div className="card">
          <div className="flex items-center gap-2">
            <Pill className="h-5 w-5 text-teal-600" />
            <h2 className="text-base font-semibold text-slate-900">Treatment</h2>
          </div>
          <p className="mt-4 leading-relaxed text-sm text-slate-600">{disease.treatmentOverview}</p>
          {disease.managementApproaches && disease.managementApproaches.length > 0 && (
            <ul className="mt-3 space-y-1.5 text-sm text-slate-600">
              {disease.managementApproaches.map((s) => <li key={s} className="flex gap-2"><span>•</span>{s}</li>)}
            </ul>
          )}
          {disease.antimicrobialConsiderations && (
            <p className="mt-3 text-sm text-slate-600"><span className="font-semibold text-slate-700">Antimicrobial considerations:</span> {disease.antimicrobialConsiderations}</p>
          )}
        </div>
      </div>

      {isMalaria && (
        <div className="card mt-6">
          <div className="flex items-center gap-2">
            <Dna className="h-5 w-5 text-teal-600" />
            <h2 className="text-base font-semibold text-slate-900">Parasite Life Cycle</h2>
          </div>
          <p className="mt-3 text-sm text-slate-600">
            The Plasmodium life cycle alternates between the Anopheles mosquito and the human host, driving the
            cyclical fevers characteristic of malaria.
          </p>
          <DiseaseImage diseaseId={disease.id} type="lifecycle" className="mt-4 h-48 w-full rounded-xl sm:h-64" />
        </div>
      )}

      <div className="card mt-6">
        <div className="flex items-center gap-2">
          <ClipboardList className="h-5 w-5 text-teal-600" />
          <h2 className="text-base font-semibold text-slate-900">Pathogenesis</h2>
        </div>
        <p className="mt-3 leading-relaxed text-sm text-slate-600">{disease.pathogenesis}</p>
      </div>

      {disease.faqs && disease.faqs.length > 0 && (
        <div className="card mt-6">
          <div className="flex items-center gap-2">
            <HelpCircle className="h-5 w-5 text-teal-600" />
            <h2 className="text-base font-semibold text-slate-900">Frequently Asked Questions</h2>
          </div>
          <div className="mt-4 space-y-4">
            {disease.faqs.map((f) => (
              <div key={f.question}>
                <p className="text-sm font-semibold text-slate-900">{f.question}</p>
                <p className="mt-1 text-sm text-slate-600">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="card mt-6">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-slate-400" />
          <h2 className="text-base font-semibold text-slate-900">References</h2>
        </div>
        <ul className="mt-4 space-y-2 text-sm text-teal-600">
          {disease.references.map((r) => <li key={r}>{r}</li>)}
        </ul>
      </div>
    </div>
  );
}
