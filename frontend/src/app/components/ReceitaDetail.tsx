"use client";

interface Material {
  id: string;
  nome: string;
  unidade: string;
  precoUnitario: number;
}

interface ReceitaMaterial {
  materialId: string;
  quantidade: number;
  unidade: string;
}

interface Receita {
  id: string;
  nome: string;
  descricao: string;
  instrucoes: string;
  tempoPreparo: number;
  rendimento: string;
  materiais: ReceitaMaterial[];
  dataCriacao: string;
  visualizacoes: number;
}

interface ReceitaDetailProps {
  receita: Receita;
  materiais: Material[];
  onClose: () => void;
  onEdit: () => void;
}

export default function ReceitaDetail({ receita, materiais, onClose, onEdit }: ReceitaDetailProps) {
  const calculateTotalCost = () => {
    return receita.materiais.reduce((total, item) => {
      const material = materiais.find(m => m.id === item.materialId);
      if (material) {
        return total + (material.precoUnitario * item.quantidade);
      }
      return total;
    }, 0);
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatTime = (minutes: number) => {
    if (minutes < 60) {
      return `${minutes} minutos`;
    }
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return remainingMinutes > 0 ? `${hours} hora${hours > 1 ? 's' : ''} e ${remainingMinutes} minuto${remainingMinutes > 1 ? 's' : ''}` : `${hours} hora${hours > 1 ? 's' : ''}`;
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const totalCost = calculateTotalCost();
  const costPerServing = () => {
    // Tenta extrair número do rendimento (ex: '12 fatias', '8 porções')
    const match = receita.rendimento && receita.rendimento.match(/\d+/);
    if (match) {
      const portions = parseInt(match[0]);
      if (portions > 0) return totalCost / portions;
    }
    return null;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{receita.nome}</h2>
            {receita.descricao && (
              <p className="text-gray-600 mb-2">{receita.descricao}</p>
            )}
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <span>📅 Criada em {formatDate(receita.dataCriacao)}</span>
              <span>👁️ {receita.visualizacoes} visualizações</span>
            </div>
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onEdit}
              className="bg-pink-500 text-white px-4 py-2 rounded-md hover:bg-pink-600 transition-colors"
            >
              ✏️ Editar
            </button>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Informações Principais */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-blue-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">⏱️</span>
              <h3 className="font-semibold text-gray-900">Tempo de Preparo</h3>
            </div>
            <p className="text-lg font-medium text-blue-700">{formatTime(receita.tempoPreparo)}</p>
          </div>

          <div className="bg-green-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">💰</span>
              <h3 className="font-semibold text-gray-900">Custo Total</h3>
            </div>
            <p className="text-lg font-medium text-green-700">{formatCurrency(totalCost)}</p>
            {costPerServing() !== null && (
              <p className="text-sm text-green-800 mt-1">Custo por porção: <b>{formatCurrency(costPerServing()!)}</b></p>
            )}
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <div className="flex items-center mb-2">
              <span className="text-2xl mr-2">🍰</span>
              <h3 className="font-semibold text-gray-900">Rendimento</h3>
            </div>
            <p className="text-lg font-medium text-purple-700">{receita.rendimento || "Não especificado"}</p>
          </div>
        </div>

        {/* Ingredientes */}
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
            <span className="mr-2">📦</span>
            Ingredientes ({receita.materiais.length})
          </h3>
          
          <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Ingrediente
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Quantidade
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Preço Unit.
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                    Subtotal
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {receita.materiais.map((item, index) => {
                  const material = materiais.find(m => m.id === item.materialId);
                  const subtotal = material ? material.precoUnitario * item.quantidade : 0;
                  const percent = totalCost > 0 ? (subtotal / totalCost) * 100 : 0;
                  const highlight = percent > 30;
                  
                  return (
                    <tr key={index} className={highlight ? "bg-yellow-50 hover:bg-yellow-100" : "hover:bg-gray-50"}>
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {material?.nome || "Material não encontrado"}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {item.quantidade} {item.unidade}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900">
                        {material ? formatCurrency(material.precoUnitario) : '-'}
                      </td>
                      <td className="px-6 py-4 text-sm font-semibold text-gray-900">
                        {formatCurrency(subtotal)}
                        <span className="ml-2 text-xs text-gray-500">({percent.toFixed(1)}%)</span>
                        {highlight && <span className="ml-2 text-yellow-700 font-bold">▲</span>}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Instruções */}
        {receita.instrucoes && (
          <div className="mb-8">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <span className="mr-2">📝</span>
              Instruções de Preparo
            </h3>
            
            <div className="bg-gray-50 p-6 rounded-lg">
              <div className="prose max-w-none">
                {receita.instrucoes.split('\n').map((instruction, index) => (
                  <p key={index} className="mb-3 text-gray-700 leading-relaxed">
                    {instruction}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Resumo de Custos */}
        <div className="bg-pink-50 p-6 rounded-lg border border-pink-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 Resumo de Custos</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Custo total dos ingredientes:</p>
              <p className="text-2xl font-bold text-pink-600">{formatCurrency(totalCost)}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Custo por porção (estimado):</p>
              <p className="text-lg font-semibold text-gray-900">
                {receita.rendimento ? 
                  formatCurrency(totalCost / Math.max(1, parseInt(receita.rendimento.match(/\d+/)?.[0] || "1") || 1)) : 
                  "Não calculável"
                }
              </p>
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="flex gap-3 pt-6 border-t mt-8">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors"
          >
            Fechar
          </button>
          <button
            onClick={onEdit}
            className="flex-1 px-4 py-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition-colors"
          >
            Editar Receita
          </button>
        </div>
      </div>
    </div>
  );
}
