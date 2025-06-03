import React, { useState, useEffect } from 'react';
import { Package, MapPin, Clock, Phone, User, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const DeliveryDashboard = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const stored = JSON.parse(localStorage.getItem('orders')) || [];
        const parsed = stored.map((order, idx) => ({
            id: `ORD-${(idx + 1).toString().padStart(3, '0')}`,
            customerName: order.user.name,
            customerPhone: order.user.phone,
            address: order.address,
            items: order.items.map(i => `${i.name} x${i.quantity}`),
            totalAmount: order.total,
            orderTime: new Date(order.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            estimatedDelivery: calcEta(order.timestamp),
            status: 'pending',
            priority: Math.random() < 0.3 ? 'urgent' : 'normal', // 랜덤 긴급도 (임시)
        }));
        setOrders(parsed);
    }, []);

    const formatPrice = (price) => `${price.toLocaleString()}원`;

    const getPriorityColor = (priority) =>
        priority === 'urgent' ? 'bg-red-100 text-red-800' : 'bg-blue-100 text-blue-800';

    const calcEta = (timestamp) => {
        const orderTime = new Date(timestamp);
        orderTime.setMinutes(orderTime.getMinutes() + 90); // 1시간 30분 후
        return orderTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    };

    const handleStartDelivery = (orderId) => {
        setOrders((prevOrders) =>
            prevOrders.map((order) =>
                order.id === orderId ? { ...order, status: 'in-progress' } : order
            )
        );
    };


    const handleCallCustomer = (phone) => {
        console.log(`고객 연락: ${phone}`);
    };

    return (
        <div className="min-h-screen bg-gray-50 p-6">
            <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">배송 대시보드</h1>
                            <p className="text-gray-600">오늘 배송 대기 중인 주문 목록입니다</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">{orders.length}</div>
                                <div className="text-sm text-gray-500">대기 중</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-red-600">
                                    {orders.filter(order => order.priority === 'urgent').length}
                                </div>
                                <div className="text-sm text-gray-500">긴급</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                    {orders.map((order) => (
                        <Card key={order.id} className="shadow-sm hover:shadow-md transition-shadow">
                            <CardHeader className="pb-3">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-lg font-semibold">{order.id}</CardTitle>
                                        <div className="flex items-center gap-2 mt-1">
                                            <Badge className={getPriorityColor(order.priority)}>
                                                {order.priority === 'urgent' ? '긴급' : '일반'}
                                            </Badge>
                                            <span className="text-sm text-gray-500">주문시간: {order.orderTime}</span>
                                            {order.status === 'in-progress' && (
                                                <Badge className="bg-green-100 text-green-700 ml-2">배송 중</Badge>
                                            )}
                                        </div>
                                    </div>
                                    <Package className="w-6 h-6 text-blue-600" />
                                </div>
                            </CardHeader>

                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4 text-gray-500" />
                                        <span className="font-medium">{order.customerName}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Phone className="w-4 h-4 text-gray-500" />
                                        <span className="text-sm text-gray-600">{order.customerPhone}</span>
                                    </div>
                                    <div className="flex items-start gap-2">
                                        <MapPin className="w-4 h-4 text-gray-500 mt-0.5" />
                                        <span className="text-sm text-gray-600 leading-relaxed">{order.address}</span>
                                    </div>
                                </div>

                                <div className="bg-gray-50 p-3 rounded-lg">
                                    <h4 className="font-medium text-sm mb-2">주문 상품</h4>
                                    <ul className="space-y-1">
                                        {order.items.map((item, index) => (
                                            <li key={index} className="text-sm text-gray-700">• {item}</li>
                                        ))}
                                    </ul>
                                    <div className="mt-2 pt-2 border-t border-gray-200">
                                        <div className="flex justify-between items-center">
                                            <span className="text-sm font-medium">총 금액</span>
                                            <span className="font-bold text-blue-600">{formatPrice(order.totalAmount)}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-sm">
                                    <Clock className="w-4 h-4 text-orange-500" />
                                    <span className="text-gray-600">예상 배송: </span>
                                    <span className="font-medium text-orange-600">{order.estimatedDelivery}</span>
                                </div>

                                <div className="flex gap-2 pt-2">
                                    <Button
                                        className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:opacity-50"
                                        onClick={() => handleStartDelivery(order.id)}
                                        disabled={order.status === 'in-progress'}
                                    >
                                        <CheckCircle className="w-4 h-4 mr-2" />
                                        {order.status === 'in-progress' ? '배송 중' : '배송 시작'}
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="px-3"
                                        onClick={() => handleCallCustomer(order.customerPhone)}
                                    >
                                        <Phone className="w-4 h-4" />
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {orders.length === 0 && (
                    <div className="text-center py-20">
                        <Package className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                        <h2 className="text-2xl font-semibold text-gray-500 mb-4">배송 대기 중인 주문이 없습니다</h2>
                        <p className="text-gray-400">새로운 주문이 들어오면 여기에 표시됩니다.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DeliveryDashboard;
