import CardDashboard from './custom_component/cardDashboard';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className='flex gap-7'>
          <CardDashboard title="Contratos Concluidos" content={7} status="concluido"/>        
          <CardDashboard title="Contratos em Contratação" content={2} status="emcontratacao"/>        
          <CardDashboard title="Contratos Paralisados" content={4} status="paralisado"/>        
          <CardDashboard title="Contratos Cancelados" content={1} status="cancelado"/>        
      </div>
      <div>

        
      </div>
    </main>
  );
}
