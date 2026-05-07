import { useState } from 'react';
import { useNavigate } from 'react-router';
import { Search, Sparkles, User, Ruler, Weight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { Progress } from '../components/ui/progress';
import { Button } from '../components/ui/Button';
import { Input } from '../components/ui/Input';
import { ConditionCard } from '../components/onboarding/ConditionCard';
import { AllergyChip } from '../components/onboarding/AllergyChip';

const conditions = [
    'diabetes',
    'hypertension',
    'ibs',
    'thyroid',
    'celiac',
    'heart',
    'kidney',
    'liver',
    'arthritis',
    'gout'
];

const allergies = [
    'gluten',
    'lactose',
    'nuts',
    'shellfish',
    'soy',
    'egg',
    'fish',
    'sesame'
];

export function Onboarding() {
    const navigate = useNavigate();
    const { t } = useLanguage();
    const [currentStep, setCurrentStep] = useState(0);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
    const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
    const [healthMetrics, setHealthMetrics] = useState({
        age: '',
        height: '',
        weight: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const steps = [
        t('onboarding.step1'),
        t('onboarding.step2'),
        t('onboarding.step3'),
        t('onboarding.step4')
    ];

    const progressValue = ((currentStep + 1) / steps.length) * 100;

    const toggleCondition = (id: string) => {
        setSelectedConditions(prev =>
            prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]
        );
    };

    const toggleAllergy = (id: string) => {
        setSelectedAllergies(prev =>
            prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]
        );
    };

    const filteredConditions = conditions.filter(condition =>
        t(`condition.${condition}`).toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleNext = async () => {
        if (currentStep === 0) {
            if (!healthMetrics.age || !healthMetrics.height || !healthMetrics.weight) {
                alert("Lütfen yaş, boy ve kilo bilgilerinizi giriniz.");
                return;
            }
        }

        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            setIsSubmitting(true);
            try {
                const response = await fetch('/api/health/profile', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        age: Number(healthMetrics.age),
                        height: Number(healthMetrics.height),
                        weight: Number(healthMetrics.weight),
                        chronicDiseases: selectedConditions,
                        intolerances: selectedAllergies
                    })
                });

                if (response.ok) {
                    navigate('/');
                } else {
                    const error = await response.json();
                    alert("Kayıt sırasında bir hata oluştu: " + (error.message || "Bilinmeyen hata"));
                }
            } catch (error) {
                console.error("Profile creation error:", error);
                alert("Sunucuya bağlanırken bir hata oluştu.");
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    const handleBack = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleMetricsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setHealthMetrics({
            ...healthMetrics,
            [e.target.name]: e.target.value
        });
    };

    return (
        <div className="min-h-screen bg-background py-12 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-foreground mb-8">
                        {t('onboarding.title')}
                    </h1>

                    {/* Progress Stepper */}
                    <div className="mb-6">
                        <div className="flex justify-between items-center mb-3">
                            {steps.map((step, index) => (
                                <div
                                    key={step}
                                    className={`flex-1 text-sm font-medium transition-colors ${index <= currentStep ? 'text-forest-green' : 'text-muted-foreground'
                                        }`}
                                >
                                    {step}
                                </div>
                            ))}
                        </div>
                        <Progress value={progressValue} className="h-3" />
                    </div>
                </div>

                {/* Step Content */}
                <div className="bg-card border-2 border-border rounded-2xl p-8 shadow-lg mb-8">
                    {/* Step 1: Health Metrics */}
                    {currentStep === 0 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-foreground text-center mb-6">
                                {t('onboarding.metrics.title')}
                            </h2>

                            <div className="max-w-md mx-auto space-y-5">
                                {/* Age Input */}
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none z-10" />
                                    <Input
                                        type="number"
                                        name="age"
                                        label={t('Age (years)')}
                                        placeholder={t('Enter your age')}
                                        value={healthMetrics.age}
                                        onChange={handleMetricsChange}
                                        className="pl-12"
                                        min="1"
                                        max="120"
                                    />
                                </div>

                                {/* Height Input */}
                                <div className="relative">
                                    <Ruler className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none z-10" />
                                    <Input
                                        type="number"
                                        name="height"
                                        label={t('Height (cm)')}
                                        placeholder={t('Enter your height')}
                                        value={healthMetrics.height}
                                        onChange={handleMetricsChange}
                                        className="pl-12"
                                        min="50"
                                        max="300"
                                    />
                                </div>

                                {/* Weight Input */}
                                <div className="relative">
                                    <Weight className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none z-10" />
                                    <Input
                                        type="number"
                                        name="weight"
                                        label={t('Weight (kg)')}
                                        placeholder={t('Enter your weight')}
                                        value={healthMetrics.weight}
                                        onChange={handleMetricsChange}
                                        className="pl-12"
                                        min="20"
                                        max="500"
                                    />
                                </div>

                                {/* BMI Display (if both height and weight are entered) */}
                                {healthMetrics.height && healthMetrics.weight && (
                                    <div className="mt-6 p-4 bg-accent/30 rounded-xl border border-border">
                                        <div className="flex items-center justify-between">
                                            <span className="text-sm font-medium text-foreground">BMI:</span>
                                            <span className="text-lg font-semibold text-forest-green">
                                                {(
                                                    parseFloat(healthMetrics.weight) /
                                                    Math.pow(parseFloat(healthMetrics.height) / 100, 2)
                                                ).toFixed(1)}
                                            </span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Step 2: Chronic Conditions */}
                    {currentStep === 1 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-foreground text-center mb-6">
                                {t('onboarding.conditions.title')}
                            </h2>

                            {/* Search Bar */}
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                                <Input
                                    type="text"
                                    placeholder={t('onboarding.conditions.search')}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="pl-12"
                                />
                            </div>

                            {/* Conditions Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                {filteredConditions.map(condition => (
                                    <ConditionCard
                                        key={condition}
                                        id={condition}
                                        label={t(`condition.${condition}`)}
                                        selected={selectedConditions.includes(condition)}
                                        onToggle={toggleCondition}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 3: Allergies & Intolerances */}
                    {currentStep === 2 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-foreground text-center mb-6">
                                {t('onboarding.allergies.title')}
                            </h2>

                            {/* Allergies Tag Cloud */}
                            <div className="flex flex-wrap gap-3 justify-center">
                                {allergies.map(allergy => (
                                    <AllergyChip
                                        key={allergy}
                                        id={allergy}
                                        label={t(`allergy.${allergy}`)}
                                        selected={selectedAllergies.includes(allergy)}
                                        onToggle={toggleAllergy}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Step 4: AI Insights */}
                    {currentStep === 3 && (
                        <div className="space-y-6">
                            <h2 className="text-xl font-semibold text-foreground text-center mb-6">
                                Your Personalized Profile
                            </h2>

                            {/* Summary Cards */}
                            <div className="grid md:grid-cols-2 gap-6 mb-8">
                                <div className="bg-accent/30 rounded-xl p-6 border border-border">
                                    <h3 className="font-semibold text-foreground mb-3">Health Metrics</h3>
                                    <div className="space-y-2 text-sm">
                                        {healthMetrics.age && (
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">{t('onboarding.metrics.age')}:</span>
                                                <span className="font-medium">{healthMetrics.age} years</span>
                                            </div>
                                        )}
                                        {healthMetrics.height && (
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">{t('onboarding.metrics.height')}:</span>
                                                <span className="font-medium">{healthMetrics.height} cm</span>
                                            </div>
                                        )}
                                        {healthMetrics.weight && (
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">{t('onboarding.metrics.weight')}:</span>
                                                <span className="font-medium">{healthMetrics.weight} kg</span>
                                            </div>
                                        )}
                                        {healthMetrics.height && healthMetrics.weight && (
                                            <div className="flex justify-between pt-2 border-t border-border">
                                                <span className="text-muted-foreground">BMI:</span>
                                                <span className="font-semibold text-forest-green">
                                                    {(
                                                        parseFloat(healthMetrics.weight) /
                                                        Math.pow(parseFloat(healthMetrics.height) / 100, 2)
                                                    ).toFixed(1)}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                <div className="bg-accent/30 rounded-xl p-6 border border-border">
                                    <h3 className="font-semibold text-foreground mb-3">Selected Conditions</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedConditions.length > 0 ? (
                                            selectedConditions.map(condition => (
                                                <span key={condition} className="px-3 py-1 bg-card rounded-full text-sm border border-border">
                                                    {t(`condition.${condition}`)}
                                                </span>
                                            ))
                                        ) : (
                                            <p className="text-sm text-muted-foreground">None selected</p>
                                        )}
                                    </div>
                                </div>

                            </div>

                            <div className="grid md:grid-cols-1 gap-6 mb-8">
                                <div className="bg-accent/30 rounded-xl p-6 border border-border">
                                    <h3 className="font-semibold text-foreground mb-3">Allergies & Intolerances</h3>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedAllergies.length > 0 ? (
                                            selectedAllergies.map(allergy => (
                                                <span key={allergy} className="px-3 py-1 bg-card rounded-full text-sm border border-border">
                                                    {t(`allergy.${allergy}`)}
                                                </span>
                                            ))
                                        ) : (
                                            <p className="text-sm text-muted-foreground">None selected</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* AI Insights Box */}
                            <div className="bg-gradient-to-br from-forest-green/10 to-forest-green/5 rounded-xl p-6 border-2 border-forest-green/20">
                                <div className="flex items-start gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-forest-green/10 flex items-center justify-center">
                                        <Sparkles className="w-6 h-6 text-forest-green" />
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-forest-green mb-2">AI-Powered Insights</h3>
                                        <p className="text-sm text-foreground leading-relaxed">
                                            {t('onboarding.insights.text')}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Navigation Footer */}
                <div className="flex justify-between items-center gap-4">
                    <Button
                        variant="outline"
                        onClick={handleBack}
                        disabled={currentStep === 0 || isSubmitting}
                        className="min-w-[120px]"
                    >
                        {t('onboarding.back')}
                    </Button>

                    <Button
                        variant="primary"
                        onClick={handleNext}
                        disabled={isSubmitting}
                        className="min-w-[200px] bg-forest-green hover:bg-forest-green/90 focus:ring-forest-green"
                    >
                        {isSubmitting ? "..." : (currentStep === steps.length - 1
                            ? t('onboarding.complete')
                            : t('onboarding.next'))}
                    </Button>
                </div>
            </div>
        </div>
    );
}
