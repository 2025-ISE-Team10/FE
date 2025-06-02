import React, { useState, useEffect } from 'react';
import { Minus, Plus, Trash2, ShoppingCart, CreditCard, Truck } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Header from './Header';
import products from '../data/products.json';
import AddressPicker from './AddressPicker';

const CartPage = () => {
  const [cartItems, setCartItems] = useState([]);
  const [shippingInfo, setShippingInfo] = useState({
    name: "",
    phone: "",
    address: "",
    lat: null,
    lng: null,
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user || !user.cart) return;
    const userCartIds = user.cart;
    const filtered = products.filter(p => userCartIds.includes(p.id));
    const mapped = filtered.map(p => ({
      id: p.id,
      name: p.title,
      description: p.description,
      price: p.price,
      quantity: 1,
      image: p.image,
      category: '상품'
    }));
    setCartItems(mapped);
  }, []);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity <= 0) {
      removeItem(id);
      return;
    }
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const getSubtotal = () => cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const getShippingFee = () => getSubtotal() > 30000 ? 0 : 3000;
  const getTotalPrice = () => getSubtotal() + getShippingFee();
  const formatPrice = (price) => `${price.toLocaleString()}원`;

  const handleSelectLocation = (loc) => {
    setShippingInfo((prev) => ({ ...prev, address: loc.address, lat: loc.lat, lng: loc.lng }));
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-6xl mx-auto p-8">
          <div className="text-center py-20">
            <ShoppingCart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
            <h2 className="text-2xl font-semibold text-gray-500 mb-4">장바구니가 비어있습니다</h2>
            <p className="text-gray-400 mb-8">쇼핑을 계속하여 상품을 추가해보세요!</p>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg">
              쇼핑 계속하기
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-6xl mx-auto p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2 mt-6">장바구니</h1>
          <p className="text-gray-600">총 {cartItems.length}개의 상품이 담겨있습니다</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">주문 상품</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-0">
                  {cartItems.map((item, index) => (
                    <div key={item.id} className={`p-6 ${index !== cartItems.length - 1 ? 'border-b' : ''}`}>
                      <div className="flex gap-6">
                        <div className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1">
                          <div className="flex justify-between items-start mb-2">
                            <div>
                              <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                              <p className="text-sm text-gray-500 line-clamp-2">{item.description}</p>
                              <p className="text-xs text-gray-400 mt-1">{item.category}</p>
                            </div>
                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-red-500" onClick={() => removeItem(item.id)}>
                              <Trash2 className="w-5 h-5" />
                            </Button>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="text-xl font-bold text-gray-900">{formatPrice(item.price)}</div>
                            <div className="flex items-center gap-3">
                              <Button variant="outline" size="icon" className="w-10 h-10" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                                <Minus className="w-4 h-4" />
                              </Button>
                              <span className="w-12 text-center font-medium text-lg">{item.quantity}</span>
                              <Button variant="outline" size="icon" className="w-10 h-10" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                                <Plus className="w-4 h-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="p-6 border-t">
                  <AddressPicker onSelect={handleSelectLocation} />
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl">주문 요약</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">상품 금액</span>
                  <span className="font-medium">{formatPrice(getSubtotal())}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 flex items-center gap-1">
                    <Truck className="w-4 h-4" /> 배송비
                  </span>
                  <span className="font-medium">
                    {getShippingFee() === 0 ? '무료' : formatPrice(getShippingFee())}
                  </span>
                </div>
                {getShippingFee() > 0 && (
                  <p className="text-sm text-blue-600">
                    {formatPrice(30000 - getSubtotal())} 더 구매하시면 무료배송!
                  </p>
                )}
                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">총 결제 금액</span>
                    <span className="text-2xl font-bold text-blue-600">{formatPrice(getTotalPrice())}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">배송 정보</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">받는 분</Label>
                  <Input id="name" value={shippingInfo.name} onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })} />
                </div>
                <div>
                  <Label htmlFor="phone">휴대폰 번호</Label>
                  <Input id="phone" value={shippingInfo.phone} onChange={(e) => setShippingInfo({ ...shippingInfo, phone: e.target.value })} />
                </div>
                <div className="space-y-2">
                  <Label>배송 주소</Label>
                  <Input readOnly value={shippingInfo.address} placeholder="지도를 눌러 주소 선택" className="cursor-default" />
                  {shippingInfo.lat && (
                    <p className="text-xs text-gray-500">📍 {shippingInfo.lat.toFixed(4)}, {shippingInfo.lng.toFixed(4)}</p>
                  )}
                </div>
              </CardContent>
            </Card>

            <Button className="w-full h-14 text-lg font-semibold bg-blue-600 hover:bg-blue-700 text-white rounded-lg flex items-center justify-center gap-2">
              <CreditCard className="w-5 h-5" />
              {formatPrice(getTotalPrice())} 결제하기
            </Button>

            <div className="text-center text-sm text-gray-500">
              안전한 결제를 위해 SSL 암호화가 적용됩니다
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
