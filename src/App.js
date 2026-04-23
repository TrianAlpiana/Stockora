import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import NotFound from './NotFound';

function App() {
  const [role, setRole] = useState('Admin');
  const [items, setItems] = useState([
    { id: 1, name: 'Kopi Bubuk', stock: 8, minStock: 10, barcode: '888111' },
    { id: 2, name: 'Gula Pasir', stock: 30, minStock: 15, barcode: '888222' },
    { id: 3, name: 'Teh Celup', stock: 100, minStock: 20, barcode: '888333' },
    { id: 4, name: 'Susu Cair', stock: 25, minStock: 12, barcode: '888444' },
    { id: 5, name: 'Roti Tawar', stock: 50, minStock: 10, barcode: '888555' },
    { id: 6, name: 'Minuman Soda', stock: 15, minStock: 20, barcode: '888666' },
    { id: 7, name: 'Biskuit Coklat', stock: 40, minStock: 8, barcode: '888777' },
    { id: 8, name: 'Mie Instan', stock: 60, minStock: 15, barcode: '888888' },
    { id: 9, name: 'Kacang Tanah', stock: 22, minStock: 10, barcode: '888999' },
    { id: 10, name: 'Coklat Batang', stock: 35, minStock: 5, barcode: '888000' }
  ]);
  const [rewards, setRewards] = useState(0);
  const [history, setHistory] = useState([]);
  const [historyRewards, setHistoryRewards] = useState([]);
  const [selectedReward, setSelectedReward] = useState('');
  const [rewardQuantity, setRewardQuantity] = useState('');
  const [rewardType, setRewardType] = useState('Masuk');
  const [rewardsItems, setRewardsItems] = useState([
    { name: 'Tas', stock: 2 },
    { name: 'Topi', stock: 1 },
    { name: 'Botol Minum', stock: 0 },
    { name: 'Kaos', stock: 3 }
  ]);
  const [selectedItem, setSelectedItem] = useState('');
  const [quantity, setQuantity] = useState('');
  const [type, setType] = useState('Masuk');

  const lowStockItems = items.filter(item => item.stock <= item.minStock);
  
  const handleTransaction = () => {
    if (!selectedItem || !quantity) return;
    const item = items.find(i => i.name === selectedItem);
    if (!item) return;
    const qty = parseInt(quantity);
    let newStock = item.stock;
    if (type === 'Masuk') {
      newStock += qty;
    } else {
      newStock -= qty;
    }
    setItems(items.map(i => i.id === item.id ? { ...i, stock: newStock } : i));
    setHistory([...history, { item: selectedItem, type, quantity: qty, date: new Date().toLocaleString() }]);
    setSelectedItem('');
    setQuantity('');
  };

  const handleRewardTransaction = () => {
    if (!selectedReward || !rewardQuantity) return;
    const qty = parseInt(rewardQuantity);
    const reward = rewardsItems.find(r => r.name === selectedReward);
    if (!reward) return;
    let newStock = reward.stock;
    if (rewardType === 'Masuk') {
      newStock += qty;
    } else {
      if (newStock < qty) {
        alert('Stok hadiah tidak cukup!');
        return;
      }
      newStock -= qty;
    }
    setRewardsItems(rewardsItems.map(r => r.name === selectedReward ? { ...r, stock: newStock } : r));
    setHistoryRewards([...historyRewards, { type: rewardType, name: selectedReward, quantity: qty, date: new Date().toLocaleString() }]);
    setSelectedReward('');
    setRewardQuantity('');
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={
    <div style={{ 
      padding: '20px', 
      fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif", 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)', 
      minHeight: '100vh', 
      color: '#fff' 
    }}>
      <div style={{ 
        maxWidth: '1400px', 
        margin: '0 auto', 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '20px' 
      }}>
        <div style={{ 
          textAlign: 'center', 
          background: 'rgba(255, 255, 255, 0.1)', 
          padding: '20px', 
          borderRadius: '15px', 
          boxShadow: '0 10px 30px rgba(0,0,0,0.3)' 
        }}>
          <h1 style={{ margin: '0', fontSize: '3em', textShadow: '3px 3px 6px rgba(0,0,0,0.5)', fontWeight: 'bold' }}>Stockora</h1>
          <p style={{ margin: '10px 0 0 0', fontSize: '1.2em', opacity: 0.9 }}>Sistem Manajemen Inventaris</p>
        </div>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '20px', 
          flexWrap: 'wrap' 
        }}>
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.15)', 
            padding: '20px', 
            borderRadius: '15px', 
            boxShadow: '0 8px 25px rgba(0,0,0,0.2)', 
            flex: '1', 
            minWidth: '300px' 
          }}>
            <label style={{ fontSize: '1.3em', fontWeight: 'bold', marginBottom: '10px', display: 'block' }}>Peran Pengguna:</label>
            <select 
              value={role} 
              onChange={e => setRole(e.target.value)} 
              style={{ 
                padding: '12px', 
                borderRadius: '8px', 
                border: 'none', 
                fontSize: '1.1em', 
                background: '#fff', 
                color: '#333', 
                width: '100%', 
                boxShadow: '0 2px 5px rgba(0,0,0,0.1)' 
              }}
            >
              <option value="Admin">Admin</option>
              <option value="Karyawan">Karyawan</option>
            </select>
          </div>
        </div>
        {lowStockItems.length > 0 && (
          <div style={{ 
            background: 'linear-gradient(45deg, #ff6b6b, #ee5a52)', 
            color: 'white', 
            padding: '20px', 
            borderRadius: '15px', 
            boxShadow: '0 8px 25px rgba(255,107,107,0.3)', 
            textAlign: 'center' 
          }}>
            <h3 style={{ margin: '0 0 15px 0', fontSize: '1.5em' }}>⚠️ Peringatan Stok Hampir Habis</h3>
            {lowStockItems.map(item => <p key={item.id} style={{ margin: '5px 0', fontSize: '1.1em' }}>{item.name} - Stok: {item.stock}</p>)}
          </div>
        )}
        {role === 'Admin' && (
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.2)', 
          padding: '20px', 
          borderRadius: '10px', 
          marginBottom: '20px', 
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)' 
        }}>
          <h2 style={{ marginTop: '0', color: '#fff' }}>Transaksi Barang</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <select 
              value={selectedItem} 
              onChange={e => setSelectedItem(e.target.value)} 
              style={{ 
                padding: '12px', 
                borderRadius: '8px', 
                border: 'none', 
                fontSize: '1em', 
                background: '#fff', 
                color: '#333' 
              }}
            >
              <option value="">Pilih Barang</option>
              {items.map(item => <option key={item.id} value={item.name}>{item.name}</option>)}
            </select>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <label style={{ fontSize: '1.1em' }}>Jenis:</label>
              <select 
                value={type} 
                onChange={e => setType(e.target.value)} 
                style={{ 
                  padding: '12px', 
                  borderRadius: '8px', 
                  border: 'none', 
                  fontSize: '1em', 
                  background: '#fff', 
                  color: '#333', 
                  flex: '1' 
                }}
              >
                <option value="Masuk">Barang Masuk</option>
                <option value="Keluar">Barang Keluar</option>
              </select>
            </div>
            <input 
              type="number" 
              placeholder="Jumlah" 
              value={quantity} 
              onChange={e => setQuantity(e.target.value)} 
              style={{ 
                padding: '12px', 
                borderRadius: '8px', 
                border: 'none', 
                fontSize: '1em', 
                background: '#fff', 
                color: '#333' 
              }} 
            />
            <button 
              onClick={handleTransaction} 
              style={{ 
                padding: '12px', 
                background: 'linear-gradient(45deg, #2196F3, #1976D2)', 
                color: 'white', 
                border: 'none', 
                borderRadius: '8px', 
                cursor: 'pointer', 
                fontSize: '1em', 
                fontWeight: 'bold', 
                boxShadow: '0 4px 10px rgba(33,150,243,0.3)' 
              }}
            >
              💾 Simpan
            </button>
          </div>
        </div>
        )}
        {role === 'Admin' && (
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.2)', 
          padding: '20px', 
          borderRadius: '10px', 
          marginBottom: '20px', 
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)' 
        }}>
          <h2 style={{ marginTop: '0', color: '#fff' }}>Transaksi Hadiah</h2>
          <select 
            value={selectedReward} 
            onChange={e => setSelectedReward(e.target.value)} 
            style={{ 
              padding: '10px', 
              marginRight: '10px', 
              borderRadius: '5px', 
              border: 'none', 
              fontSize: '1em', 
              background: '#fff', 
              color: '#333' 
            }}
          >
            <option value="">Pilih Hadiah</option>
            {rewardsItems.map(reward => <option key={reward.name} value={reward.name}>{reward.name}</option>)}
          </select>
          <label style={{ marginRight: '10px', fontSize: '1.1em' }}>Jenis:</label>
          <select 
            value={rewardType} 
            onChange={e => setRewardType(e.target.value)} 
            style={{ 
              padding: '10px', 
              marginRight: '10px', 
              borderRadius: '5px', 
              border: 'none', 
              fontSize: '1em', 
              background: '#fff', 
              color: '#333' 
            }}
          >
            <option value="Masuk">Hadiah Masuk</option>
            <option value="Keluar">Hadiah Keluar</option>
          </select>
          <input 
            type="number" 
            placeholder="Jumlah" 
            value={rewardQuantity} 
            onChange={e => setRewardQuantity(e.target.value)} 
            style={{ 
              padding: '10px', 
              marginRight: '10px', 
              borderRadius: '5px', 
              border: 'none', 
              fontSize: '1em', 
              background: '#fff', 
              color: '#333' 
            }} 
          />
          <button 
            onClick={handleRewardTransaction} 
            style={{ 
              padding: '10px 15px', 
              background: '#FF9800', 
              color: 'white', 
              border: 'none', 
              borderRadius: '5px', 
              cursor: 'pointer' 
            }}
          >
            Simpan
          </button>
        </div>
        )}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.2)', 
          padding: '20px', 
          borderRadius: '10px', 
          marginBottom: '20px', 
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)' 
        }}>
          <h2 style={{ marginTop: '0', color: '#fff' }}>Stok Tersisa</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', color: '#333', borderRadius: '5px', overflow: 'hidden' }}>
            <thead>
              <tr style={{ background: '#f5f5f5' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Barang</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Stok Tersisa</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Batas Minimum</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item.id} style={{ background: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.name}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.stock}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{item.minStock}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd', color: item.stock <= item.minStock ? 'red' : 'green' }}>
                    {item.stock <= item.minStock ? 'Hampir Habis' : 'Normal'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.2)', 
          padding: '20px', 
          borderRadius: '10px', 
          marginBottom: '20px', 
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)' 
        }}>
          <h2 style={{ marginTop: '0', color: '#fff' }}>Stok Hadiah</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', color: '#333', borderRadius: '5px', overflow: 'hidden' }}>
            <thead>
              <tr style={{ background: '#f5f5f5' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Hadiah</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Stok Tersisa</th>
              </tr>
            </thead>
            <tbody>
              {rewardsItems.map((reward, index) => (
                <tr key={reward.name} style={{ background: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{reward.name}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{reward.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {role === 'Admin' && (
          <div style={{ 
            background: 'rgba(255, 255, 255, 0.2)', 
            padding: '20px', 
            borderRadius: '10px', 
            marginBottom: '20px', 
            boxShadow: '0 4px 8px rgba(0,0,0,0.1)' 
          }}>
            <h2 style={{ marginTop: '0', color: '#fff' }}>Dashboard Grafik</h2>
            <BarChart width={600} height={300} data={items}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="stock" fill="#8884d8" />
            </BarChart>
          </div>
        )}
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.2)', 
          padding: '20px', 
          borderRadius: '10px', 
          marginBottom: '20px', 
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)' 
        }}>
          <h2 style={{ marginTop: '0', color: '#fff' }}>Riwayat Transaksi</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', color: '#333', borderRadius: '5px', overflow: 'hidden' }}>
            <thead>
              <tr style={{ background: '#f5f5f5' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Barang</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Jenis</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Jumlah</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {history.map((h, index) => (
                <tr key={index} style={{ background: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{h.item}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{h.type}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{h.quantity}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{h.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div style={{ 
          background: 'rgba(255, 255, 255, 0.2)', 
          padding: '20px', 
          borderRadius: '10px', 
          boxShadow: '0 4px 8px rgba(0,0,0,0.1)' 
        }}>
          <h2 style={{ marginTop: '0', color: '#fff' }}>Riwayat Hadiah</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', color: '#333', borderRadius: '5px', overflow: 'hidden' }}>
            <thead>
              <tr style={{ background: '#f5f5f5' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Jenis</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Hadiah</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Jumlah Hadiah</th>
                <th style={{ padding: '10px', border: '1px solid #ddd' }}>Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {historyRewards.map((h, index) => (
                <tr key={index} style={{ background: index % 2 === 0 ? '#f9f9f9' : '#fff' }}>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>Hadiah {h.type}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{h.name || '-'}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{h.quantity}</td>
                  <td style={{ padding: '10px', border: '1px solid #ddd' }}>{h.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
        } />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
