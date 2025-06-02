import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Mail, Phone, FileText, HelpCircle, Package, CreditCard, Truck } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './Header';

const InquiryForm = () => {

    const [user, setUser] = useState(null);
    const [userId, setUserId] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        inquiryType: '',
        orderNumber: '',
        subject: '',
        message: ''
    });

    const inquiryTypes = [
        { value: 'product', label: '상품 문의', icon: Package },
        { value: 'order', label: '주문/결제 문의', icon: CreditCard },
        { value: 'shipping', label: '배송 문의', icon: Truck },
        { value: 'return', label: '교환/환불 문의', icon: FileText },
        { value: 'other', label: '기타 문의', icon: HelpCircle }
    ];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.name || !formData.email || !formData.inquiryType || !formData.subject || !formData.message) {
            toast.error("필수 항목을 모두 입력해주세요.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            toast.error("올바른 이메일 주소를 입력해주세요.");
            return;
        }

        console.log('문의사항 제출:', formData);
        toast.success("문의사항이 접수되었습니다. 빠른 시일 내에 답변 드리겠습니다.");

        setFormData({
            name: '', email: '', phone: '', inquiryType: '',
            orderNumber: '', subject: '', message: ''
        });
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-gray-100 py-8">
            <Header userId={userId} setUserId={setUserId} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <div className="container mx-auto px-4 max-w-4xl">
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4 flex items-center justify-center gap-3">
                        <Mail className="w-8 h-8 text-blue-600 py-8" />
                        고객 문의
                    </h1>
                    <p className="text-gray-600 text-lg">
                        궁금한 점이 있으시면 언제든 문의해주세요. 신속하고 정확한 답변을 드리겠습니다.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-1">
                        <Card className="h-fit">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Phone className="w-5 h-5 text-blue-600" />
                                    연락처 정보
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <Phone className="w-5 h-5 text-gray-500" />
                                    <div>
                                        <p className="font-medium text-gray-900">고객센터</p>
                                        <p className="text-gray-600">1588-1234</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <Mail className="w-5 h-5 text-gray-500" />
                                    <div>
                                        <p className="font-medium text-gray-900">이메일</p>
                                        <p className="text-gray-600">support@geup.com</p>
                                    </div>
                                </div>
                                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                                    <p className="text-sm text-blue-800">
                                        <strong>운영시간:</strong><br />
                                        평일 09:00 - 18:00<br />
                                        (주말 및 공휴일 휴무)
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    <div className="lg:col-span-2">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <FileText className="w-5 h-5 text-blue-600" />
                                    문의사항 작성
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">이름 *</Label>
                                            <Input id="name" value={formData.name} onChange={(e) => handleInputChange('name', e.target.value)} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">이메일 *</Label>
                                            <Input id="email" value={formData.email} onChange={(e) => handleInputChange('email', e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">연락처</Label>
                                            <Input id="phone" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="orderNumber">주문번호</Label>
                                            <Input id="orderNumber" value={formData.orderNumber} onChange={(e) => handleInputChange('orderNumber', e.target.value)} />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label>문의 유형 *</Label>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                            {inquiryTypes.map((type) => {
                                                const IconComponent = type.icon;
                                                return (
                                                    <button
                                                        key={type.value}
                                                        type="button"
                                                        onClick={() => handleInputChange('inquiryType', type.value)}
                                                        className={`p-3 border rounded-lg flex items-center gap-2 text-sm font-medium transition-all ${formData.inquiryType === type.value
                                                            ? 'border-blue-500 bg-blue-50 text-blue-700'
                                                            : 'border-gray-300 bg-white text-gray-700'
                                                            }`}
                                                    >
                                                        <IconComponent className="w-4 h-4" />
                                                        {type.label}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="subject">문의 제목 *</Label>
                                        <Input id="subject" value={formData.subject} onChange={(e) => handleInputChange('subject', e.target.value)} />
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message">문의 내용 *</Label>
                                        <Textarea id="message" rows={6} value={formData.message} onChange={(e) => handleInputChange('message', e.target.value)} />
                                    </div>

                                    <div className="p-4 bg-gray-50 rounded-lg border">
                                        <div className="flex items-start gap-2">
                                            <input type="checkbox" id="privacy" className="mt-1" required />
                                            <label htmlFor="privacy" className="text-xs text-gray-600">
                                                <span className="font-medium">개인정보 수집 및 이용에 동의합니다.</span><br />
                                                문의 처리를 위해 입력하신 정보를 수집하며, 문의 완료 후 즉시 삭제됩니다.
                                            </label>
                                        </div>
                                    </div>

                                    <div className="flex gap-3">
                                        <Button type="button" variant="outline" className="flex-1 cursor-pointer" onClick={() => setFormData({ name: '', email: '', phone: '', inquiryType: '', orderNumber: '', subject: '', message: '' })}>초기화</Button>
                                        <Button type="submit" className="cursor-pointer flex-1 bg-blue-600 hover:bg-blue-700">문의하기</Button>
                                    </div>
                                </form>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InquiryForm;
