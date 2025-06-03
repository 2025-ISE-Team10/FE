import React from 'react';
import { CheckCircle, ShoppingCart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

const ThankyouPage = () => {
  const navigate = useNavigate();

  const handleGoToCart = () => {
    navigate('/cart');
  };

  const handleGoToHome = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <Card className="max-w-md w-full shadow-lg">
        <CardContent className="text-center p-8">
          {/* Success Icon */}
          <div className="flex justify-center mb-6">
            <CheckCircle className="w-20 h-20 text-green-500" />
          </div>

          {/* Success Message */}
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            결제 감사합니다!
          </h1>
          
          <p className="text-gray-600 mb-8">
            주문이 성공적으로 완료되었습니다.<br />
            빠른 시일 내에 배송해드리겠습니다.
          </p>

          {/* Action Buttons */}
          <div className="space-y-3">
            <Button 
              onClick={handleGoToCart}
              variant="outline"
              className="w-full flex items-center justify-center gap-2"
            >
              <ShoppingCart className="w-4 h-4" />
              장바구니로 돌아가기
            </Button>
            
            <Button 
              onClick={handleGoToHome}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white"
            >
              쇼핑 계속하기
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ThankyouPage;