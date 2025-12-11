import FreePlanNotice from '../components/UI/FreePlanNotice';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-4">
          📈 Stock Watchlist App
        </h1>
        <p className="text-center text-lg text-gray-600 mb-8">
          Відстежуйте та аналізуйте акції найпопулярніших компаній
        </p>

        <FreePlanNotice />

        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">🔍 Пошук</h3>
            <p className="text-gray-600">
              Шукайте компанії за символом або назвою
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">⭐ Watchlist</h3>
            <p className="text-gray-600">
              Створюйте власний список відстеження
            </p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h3 className="text-xl font-semibold mb-2">📊 Аналіз</h3>
            <p className="text-gray-600">
              Переглядайте детальну фінансову інформацію
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
