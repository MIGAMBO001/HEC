import { useEffect, useState } from 'react';
import { Microscope } from 'lucide-react';
import { api } from '@appdeploy/client';

export type DiseaseImageType = 'organism' | 'transmission' | 'lifecycle' | 'prevention';

interface DiseaseImageProps {
  diseaseId: string;
  type?: DiseaseImageType;
  className?: string;
}

export default function DiseaseImage({ diseaseId, type = 'organism', className }: DiseaseImageProps) {
  const [url, setUrl] = useState<string | null>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let mounted = true;
    setUrl(null);
    setFailed(false);
    api.get(`/api/disease-image/${diseaseId}?type=${type}`)
      .then((res) => { if (mounted) setUrl(res.data?.url ?? null); })
      .catch(() => { if (mounted) setFailed(true); });
    return () => { mounted = false; };
  }, [diseaseId, type]);

  if (failed || !url) {
    return (
      <div className={`flex animate-pulse items-center justify-center bg-teal-50 text-teal-300 ${className || ''}`}>
        <Microscope className="h-10 w-10" />
      </div>
    );
  }

  return <img src={url} alt="" className={`object-cover ${className || ''}`} />;
}
