import { supabaseAdmin } from '@/lib/supabase';
import { UsersTable } from '@/components/UsersTable';

export const dynamic = 'force-dynamic';

export default async function UsersPage() {
  // 1. Récupérer les profils (Data métier)
  const { data: profiles } = await supabaseAdmin
    .from('profiles')
    .select('*')
    .order('created_at', { ascending: false });

  // 2. Récupérer les users Auth (Emails)
  const { data: { users: authUsers } } = await supabaseAdmin.auth.admin.listUsers({
    perPage: 1000 
  });

  // 3. Fusionner les données
  const usersWithEmail = profiles?.map(profile => {
    const authUser = authUsers.find(u => u.id === profile.auth_uid);
    return {
      ...profile,
      email: authUser?.email || null
    };
  }) || [];

  return (
    <div className="p-6 md:p-12 space-y-8">
      <header className="mb-8">
        <div>
          <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-2">Utilisateurs</h1>
          <p className="text-muted-foreground text-sm font-medium">
            Gestion de la communauté et des accès.
          </p>
        </div>
      </header>

      {/* Client Component handling Search, Sort and Actions */}
      <UsersTable users={usersWithEmail} />

      <footer className="mt-20 py-10 opacity-20 text-center">
        <p className="text-[10px] font-bold tracking-[0.5em] uppercase italic">Wenly Management Interface</p>
      </footer>
    </div>
  );
}