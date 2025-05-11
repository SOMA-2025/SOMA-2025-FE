import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';

// fetch API를 사용하여 반드시 JSON으로 파싱
const AdminDashboard = () => {
  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

  const [receipts, setReceipts]     = useState([]);
  const [page, setPage]             = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [loading, setLoading]       = useState(true);
  const [startDate, setStartDate]   = useState('');
  const [endDate, setEndDate]       = useState('');
  const navigate = useNavigate();

  // 주문 목록 가져오기 (fetch + .json())
  useEffect(() => {
    if (!sessionStorage.getItem('adminAuth')) {
      navigate('/admin');
      return;
    }

    const fetchReceipts = async () => {
      setLoading(true);
      try {
        const resp = await fetch(
          `${API_URL}/api/admin/receipts?page=${page}&size=20`,
          { headers: { Accept: 'application/json' } }
        );
        if (!resp.ok) throw new Error(resp.statusText);
        const data = await resp.json();
        console.log('✅ fetched data:', data);

        setReceipts(Array.isArray(data.content) ? data.content : []);
        setTotalPages(typeof data.totalPages === 'number' ? data.totalPages : 1);
      } catch (err) {
        console.error('❌ fetch error:', err);
        setReceipts([]);
        setTotalPages(0);
      } finally {
        setLoading(false);
      }
    };

    fetchReceipts();
  }, [API_URL, page, navigate]);

  // 엑셀 내보내기
  const handleExport = async () => {
    try {
      const res = await fetch(
        `${API_URL}/api/admin/receipts/export?startDate=${startDate}&endDate=${endDate}`
      );
      if (!res.ok) throw new Error(res.statusText);
      const blob = await res.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `receipts_${new Date().toISOString().slice(0,10)}.xlsx`;
      document.body.appendChild(a);
      a.click();
      a.remove();
    } catch (err) {
      console.error('❌ export error:', err);
      alert('엑셀 내보내기 중 오류가 발생했습니다.');
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem('adminAuth');
    navigate('/admin');
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">로딩 중...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">주문 관리</h1>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-gray-600 text-white rounded hover:bg-gray-700"
          >
            로그아웃
          </button>
        </div>

        {/* 엑셀 내보내기 */}
        <div className="bg-white rounded shadow p-6 mb-8">
          <h2 className="text-lg font-semibold mb-4">엑셀 내보내기</h2>
          <div className="flex gap-4 items-end">
            <div>
              <label className="block text-sm mb-1">시작일</label>
              <input
                type="date"
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className="border px-2 py-1 rounded"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">종료일</label>
              <input
                type="date"
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                className="border px-2 py-1 rounded"
              />
            </div>
            <button
              onClick={handleExport}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              엑셀 다운로드
            </button>
          </div>
        </div>

        {/* 주문 목록 테이블 */}
        <div className="bg-white rounded shadow overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {['주문번호','주문일시','입금자명','연락처','총금액','관리'].map(h => (
                  <th
                    key={h}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {receipts.length > 0 ? (
                receipts.map(r => (
                  <tr key={r.id}>
                    <td className="px-6 py-4 text-sm">{r.id}</td>
                    <td className="px-6 py-4 text-sm">{new Date(r.createdAt).toLocaleString('ko-KR')}</td>
                    <td className="px-6 py-4 text-sm">{r.accountHolder}</td>
                    <td className="px-6 py-4 text-sm">{r.phoneNumber}</td>
                    <td className="px-6 py-4 text-sm">{Number(r.totalAmount).toLocaleString()} ₩</td>
                    <td className="px-6 py-4 text-sm">
                      <Link to={`/admin/receipt/${r.id}`} className="text-indigo-600 hover:underline">
                        상세보기
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr><td colSpan="6" className="px-6 py-4 text-center text-gray-500">주문 내역이 없습니다.</td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* 페이지네이션 */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <button onClick={() => setPage(p => p - 1)} disabled={page===0} className="px-3 py-1 mx-1 border rounded disabled:opacity-50">이전</button>
            <span className="px-2 py-1">{page+1} / {totalPages}</span>
            <button onClick={() => setPage(p => p + 1)} disabled={page>=totalPages-1} className="px-3 py-1 mx-1 border rounded disabled:opacity-50">다음</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;