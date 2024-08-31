import CardDashboard from './custom_component/cardDashboard';
import ChartContratos from './custom_component/chartContratos';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='flex gap-7'>
          <CardDashboard title="Contratos Concluidos" content={7} status="concluido"/>        
          <CardDashboard title="Contratos em Contratação" content={2} status="emcontratacao"/>        
          <CardDashboard title="Contratos Paralisados" content={4} status="paralisado"/>        
          <CardDashboard title="Contratos Cancelados" content={1} status="cancelado"/>        
      </div>
        <h1 className='text-6xl font-bold'>Contratos x Mes</h1>
      <div className='flex w-1/2 border-4 border-slate-700 rounded-2xl'>
        <ChartContratos />
      </div>
    </main>
  );
}
