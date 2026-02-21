import { GrowthChart } from '@/components/Charts';
import { getDashboardStats } from '@/lib/stats-api';
import { Apple, Calendar, Globe, Heart, Share2, Smartphone, TrendingUp, Users } from 'lucide-react';

export const dynamic = 'force-dynamic';

export default async function AnalyticsPage() {
    const stats = await getDashboardStats();

    return (
        <div className="p-6 md:p-12 space-y-8">
            <header className="mb-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-4">
                <div>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Analytique</h1>
                    <p className="text-muted-foreground text-sm font-medium italic">
                        Rapport détaillé sur l&apos;évolution de la communauté Wenly.
                    </p>
                </div>

                <div className="flex items-center gap-3 bg-secondary/50 border border-border/50 px-4 py-2 rounded-xl">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">
                        30 Derniers Jours
                    </span>
                </div>
            </header>

            {/* Analytics Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
                {/* Main Chart */}
                <div className="lg:col-span-2 bg-card border border-border/50 p-6 md:p-8 rounded-3xl shadow-sm">
                    <div className="flex justify-between items-start mb-10">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground">
                            Croissance cumulée
                        </h3>
                        <div className="flex items-center gap-2 text-green-500 font-black italic text-lg">
                            <TrendingUp className="w-5 h-5" />
                            <span>+12.4%</span>
                        </div>
                    </div>
                    <div className="h-96 w-full">
                        <GrowthChart data={stats.dailyGrowth} />
                    </div>
                </div>

                {/* Quick Stats Panel */}
                <div className="space-y-6">
                    <div className="bg-card border border-border/50 p-6 md:p-8 rounded-3xl shadow-sm flex flex-col justify-between h-full">
                        <h3 className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground mb-8 text-center">
                            Engagement Global
                        </h3>
                        <div className="space-y-8">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Users className="w-5 h-5 text-muted-foreground" />
                                    <span className="text-sm font-bold opacity-60">Actifs</span>
                                </div>
                                <span className="text-xl font-black italic">
                                    {stats.activeUsers24h}
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Heart className="w-5 h-5 text-muted-foreground" />
                                    <span className="text-sm font-bold opacity-60">
                                        Rétention
                                    </span>
                                </div>
                                <span className="text-xl font-black italic">
                                    {stats.retentionRate}%
                                </span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <Share2 className="w-5 h-5 text-muted-foreground" />
                                    <span className="text-sm font-bold opacity-60">
                                        Conversion
                                    </span>
                                </div>
                                <span className="text-xl font-black italic">
                                    {stats.conversionRate}%
                                </span>
                            </div>
                        </div>
                        <div className="mt-12 p-6 bg-secondary/30 rounded-2xl border border-border/30 text-center">
                            <p className="text-[10px] font-bold text-muted-foreground leading-relaxed uppercase tracking-widest">
                                Calculé en temps réel depuis l&apos;infrastructure Wenly.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Technical Distribution Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-card border border-border/50 p-8 rounded-3xl shadow-sm">
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground mb-10">
                        Origine (Store)
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-secondary/20 border border-border/40 p-5 rounded-2xl text-center">
                            <Apple className="w-5 h-5 mx-auto mb-3 text-muted-foreground" />
                            <p className="text-[10px] font-black uppercase text-muted-foreground mb-1 opacity-50">iOS</p>
                            <p className="text-xl font-black italic">{stats.originStats.ios}</p>
                        </div>
                        <div className="bg-secondary/20 border border-border/40 p-5 rounded-2xl text-center">
                            <Smartphone className="w-5 h-5 mx-auto mb-3 text-muted-foreground" />
                            <p className="text-[10px] font-black uppercase text-muted-foreground mb-1 opacity-50">Android</p>
                            <p className="text-xl font-black italic">{stats.originStats.android}</p>
                        </div>
                        <div className="bg-secondary/20 border border-border/40 p-5 rounded-2xl text-center flex flex-col justify-center">
                            <p className="text-[10px] font-black uppercase text-muted-foreground mb-1 opacity-50">Autre</p>
                            <p className="text-xl font-black italic">{stats.originStats.other}</p>
                        </div>
                    </div>
                </div>

                <div className="bg-card border border-border/50 p-8 rounded-3xl shadow-sm">
                    <h3 className="text-sm font-black uppercase tracking-[0.2em] text-muted-foreground mb-10">
                        Langues Préférées
                    </h3>
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-secondary/20 border border-border/40 p-5 rounded-2xl text-center">
                            <Globe className="w-5 h-5 mx-auto mb-3 text-muted-foreground/50" />
                            <p className="text-[10px] font-black uppercase text-muted-foreground mb-1 opacity-50">Français</p>
                            <p className="text-xl font-black italic">{stats.languageStats.fr}</p>
                        </div>
                        <div className="bg-secondary/20 border border-border/40 p-5 rounded-2xl text-center">
                            <Globe className="w-5 h-5 mx-auto mb-3 text-muted-foreground/30" />
                            <p className="text-[10px] font-black uppercase text-muted-foreground mb-1 opacity-50">Anglais</p>
                            <p className="text-xl font-black italic">{stats.languageStats.en}</p>
                        </div>
                        <div className="bg-secondary/20 border border-border/40 p-5 rounded-2xl text-center flex flex-col justify-center">
                            <p className="text-[10px] font-black uppercase text-muted-foreground mb-1 opacity-50">Autre</p>
                            <p className="text-xl font-black italic">{stats.languageStats.other}</p>
                        </div>
                    </div>
                </div>
            </div>

            <footer className="mt-20 py-10 opacity-20 text-center">
                <p className="text-[10px] font-bold tracking-[0.5em] uppercase italic">
                    Wenly Management Interface
                </p>
            </footer>
        </div>
    );
}