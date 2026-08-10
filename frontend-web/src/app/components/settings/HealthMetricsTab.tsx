import { useState, useEffect } from 'react';
import { X, Plus, RefreshCw, Calendar } from 'lucide-react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { useLanguage } from '../../context/LanguageContext';

const chronicDiseases = ['Diabetes', 'Hypertension', 'IBS', 'Thyroid', 'Celiac Disease', 'Heart Disease'];
const intolerances = ['Gluten', 'Lactose', 'Nuts', 'Shellfish', 'Soy', 'Egg'];

export function HealthMetricsTab() {
  const { t } = useLanguage();
  
  const getDiseaseTranslation = (d: string) => {
    const keyMap: any = {
      'Diabetes': 'condition.diabetes',
      'Hypertension': 'condition.hypertension',
      'IBS': 'condition.ibs',
      'Thyroid': 'condition.thyroid',
      'Celiac Disease': 'condition.celiac',
      'Heart Disease': 'condition.heart'
    };
    return keyMap[d] ? t(keyMap[d]) : d;
  };

  const getIntoleranceTranslation = (i: string) => {
    const keyMap: any = {
      'Gluten': 'allergy.gluten',
      'Lactose': 'allergy.lactose',
      'Nuts': 'allergy.nuts',
      'Shellfish': 'allergy.shellfish',
      'Soy': 'allergy.soy',
      'Egg': 'allergy.egg'
    };
    return keyMap[i] ? t(keyMap[i]) : i;
  };

  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [age, setAge] = useState('');
  const [selectedDiseases, setSelectedDiseases] = useState<string[]>([]);
  const [selectedIntolerances, setSelectedIntolerances] = useState<string[]>([]);
  const [showDiseaseDropdown, setShowDiseaseDropdown] = useState(false);
  const [showIntoleranceDropdown, setShowIntoleranceDropdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) return;

      const res = await fetch('/api/health/profile', {
        headers: { Authorization: `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        if (data.weight) setWeight(data.weight.toString());
        if (data.height) setHeight(data.height.toString());
        if (data.age) setAge(data.age.toString());
        if (data.chronicDiseases) setSelectedDiseases(data.chronicDiseases);
        if (data.intolerances) setSelectedIntolerances(data.intolerances);
      }
    } catch (e) {
      console.error(e);
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem('token');
      await fetch('/api/health/profile', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}` 
        },
        body: JSON.stringify({
          weight: parseFloat(weight) || undefined,
          height: parseFloat(height) || undefined,
          age: parseInt(age) || undefined,
          chronicDiseases: selectedDiseases,
          intolerances: selectedIntolerances
        })
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Kaydedilemedi');
      }
      alert('Profil güncellendi!');
    } catch (e: any) {
      console.error(e);
      alert('Hata oluştu: ' + (e.message || 'Bilinmeyen hata'));
    } finally {
      setIsLoading(false);
    }
  };

  const removeDisease = (disease: string) => {
    setSelectedDiseases(prev => prev.filter(d => d !== disease));
  };

  const removeIntolerance = (intolerance: string) => {
    setSelectedIntolerances(prev => prev.filter(i => i !== intolerance));
  };

  const addDisease = (disease: string) => {
    if (!selectedDiseases.includes(disease)) {
      setSelectedDiseases(prev => [...prev, disease]);
    }
    setShowDiseaseDropdown(false);
  };

  const addIntolerance = (intolerance: string) => {
    if (!selectedIntolerances.includes(intolerance)) {
      setSelectedIntolerances(prev => [...prev, intolerance]);
    }
    setShowIntoleranceDropdown(false);
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Health & Personal Metrics</h2>
        <p className="text-muted-foreground">Sağlık & Metrikler - Update your health information</p>
      </div>

      {/* Personal Metrics */}
      <div className="bg-card border-2 border-border rounded-2xl p-6 shadow-sm space-y-6">
        <h3 className="text-lg font-semibold text-foreground">Personal Metrics</h3>

        <div className="grid md:grid-cols-3 gap-6">
          <Input
            type="number"
            label="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="bg-background"
          />
          <Input
            type="number"
            label="Height (cm)"
            value={height}
            onChange={(e) => setHeight(e.target.value)}
            className="bg-background"
          />
          <Input
            type="number"
            label="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="bg-background"
          />
        </div>

        {/* BMI Display */}
        {weight && height && (
          <div className="p-4 bg-primary/10 rounded-xl border-2 border-primary/20">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-foreground">BMI:</span>
              <span className="text-lg font-bold text-primary">
                {(parseFloat(weight) / Math.pow(parseFloat(height) / 100, 2)).toFixed(1)}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Chronic Diseases */}
      <div className="bg-card border-2 border-border rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Chronic Diseases</h3>
          <div className="relative">
            <button
              onClick={() => setShowDiseaseDropdown(!showDiseaseDropdown)}
              className="flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>

            {showDiseaseDropdown && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowDiseaseDropdown(false)} />
                <div className="absolute right-0 mt-2 w-56 bg-card border-2 border-border rounded-xl shadow-lg z-20 overflow-hidden">
                  {chronicDiseases.filter(d => !selectedDiseases.includes(d)).map(disease => (
                    <button
                      key={disease}
                      onClick={() => addDisease(disease)}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-accent transition-colors"
                    >
                      {getDiseaseTranslation(disease)}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {selectedDiseases.map(disease => (
            <span
              key={disease}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium"
            >
              {getDiseaseTranslation(disease)}
              <button
                onClick={() => removeDisease(disease)}
                className="hover:bg-primary/20 rounded-full p-0.5 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </span>
          ))}
          {selectedDiseases.length === 0 && (
            <p className="text-sm text-muted-foreground">No chronic diseases selected</p>
          )}
        </div>
      </div>

      {/* Food Intolerances */}
      <div className="bg-card border-2 border-border rounded-2xl p-6 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Food Intolerances</h3>
          <div className="relative">
            <button
              onClick={() => setShowIntoleranceDropdown(!showIntoleranceDropdown)}
              className="flex items-center gap-2 px-3 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
            >
              <Plus className="w-4 h-4" />
              Add
            </button>

            {showIntoleranceDropdown && (
              <>
                <div className="fixed inset-0 z-10" onClick={() => setShowIntoleranceDropdown(false)} />
                <div className="absolute right-0 mt-2 w-56 bg-card border-2 border-border rounded-xl shadow-lg z-20 overflow-hidden">
                  {intolerances.filter(i => !selectedIntolerances.includes(i)).map(intolerance => (
                    <button
                      key={intolerance}
                      onClick={() => addIntolerance(intolerance)}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-accent transition-colors"
                    >
                      {getIntoleranceTranslation(intolerance)}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {selectedIntolerances.map(intolerance => (
            <span
              key={intolerance}
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-500 rounded-full text-sm font-medium"
            >
              {getIntoleranceTranslation(intolerance)}
              <button
                onClick={() => removeIntolerance(intolerance)}
                className="hover:bg-blue-500/20 rounded-full p-0.5 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </span>
          ))}
          {selectedIntolerances.length === 0 && (
            <p className="text-sm text-muted-foreground">No food intolerances selected</p>
          )}
        </div>
      </div>

      {/* Sync Status */}
      <div className="bg-gradient-to-br from-primary/10 to-blue-500/10 border-2 border-primary/20 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">Last Updated</p>
              <p className="text-xs text-muted-foreground">June 4, 2026 at 8:30 PM</p>
            </div>
          </div>

          <Button
            variant="primary"
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
            icon={<RefreshCw className="w-4 h-4" />}
          >
            Sync with AI
          </Button>
        </div>
      </div>

      {/* Save Changes */}
      <div className="flex justify-end gap-3 pt-4 border-t-2 border-border">
        <Button variant="outline" onClick={fetchProfile}>Cancel</Button>
        <Button variant="primary" className="bg-primary hover:bg-primary/90 text-primary-foreground" onClick={handleSave} disabled={isLoading}>
          {isLoading ? 'Saving...' : 'Save Changes'}
        </Button>
      </div>
    </div>
  );
}
