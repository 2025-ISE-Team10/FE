import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { User, Mail, Lock, Edit3, Save, Shield } from "lucide-react";
import { toast } from "react-toastify";
import Header from "./Header";

export default function MyPage() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    const loginStatus = localStorage.getItem("isLoggedIn");

    if (savedUser) {
      const parsed = JSON.parse(savedUser);
      setUser(parsed);
      setEmail(parsed.email);
      setPassword(parsed.password);
    }

    if (loginStatus === "true") {
      setIsLoggedIn(true);
    }
  }, []);

  const handleSave = () => {
    if (!user) return;

    const updatedUser = {
      ...user,
      email,
      password,
    };

    localStorage.setItem("user", JSON.stringify(updatedUser));
    setUser(updatedUser);
    setIsEditing(false);

    toast.success("회원 정보가 성공적으로 업데이트되었습니다!");
  };

  const handleCancel = () => {
    if (user) {
      setEmail(user.email);
      setPassword(user.password);
    }
    setIsEditing(false);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-lg">
          <CardContent className="p-8 text-center">
            <Shield className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h2 className="text-xl font-semibold text-gray-700 mb-2">로그인이 필요합니다</h2>
            <p className="text-gray-500">마이페이지에 접근하려면 로그인해주세요.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-100 p-4">
      <Header userId={user.id} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="text-center py-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">마이페이지</h1>
          <p className="text-gray-600">회원님의 소중한 정보를 관리하세요</p>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="text-center pb-4">
                <div className="mx-auto w-24 h-24 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center mb-4">
                  <User className="h-12 w-12 text-white" />
                </div>
                <CardTitle className="text-2xl text-gray-800">{user.name}</CardTitle>
                <Badge variant="secondary" className="mx-auto">
                  <User className="h-3 w-3 mr-1" />
                  회원
                </Badge>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">회원 ID</span>
                    <span className="font-medium text-gray-800">{user.id}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-sm text-gray-600">가입일</span>
                    <span className="font-medium text-gray-800">2024.01.01</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="md:col-span-2">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-xl text-gray-800 flex items-center gap-2">
                    <Edit3 className="h-5 w-5" />
                    정보 수정
                  </CardTitle>
                  <p className="text-gray-600 mt-1">개인정보를 안전하게 관리하세요</p>
                </div>
                {!isEditing && (
                  <Button
                    onClick={() => setIsEditing(true)}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600"
                  >
                    <Edit3 className="h-4 w-4 mr-2" />
                    편집
                  </Button>
                )}
              </CardHeader>

              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    이메일 주소
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={!isEditing}
                    className={`transition-all duration-200 ${isEditing
                        ? 'border-purple-300 focus:border-purple-500 bg-white'
                        : 'bg-gray-50 border-gray-200'
                      }`}
                    placeholder="your@email.com"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password" className="text-sm font-medium text-gray-700 flex items-center gap-2">
                    <Lock className="h-4 w-4" />
                    비밀번호
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={!isEditing}
                    className={`transition-all duration-200 ${isEditing
                        ? 'border-purple-300 focus:border-purple-500 bg-white'
                        : 'bg-gray-50 border-gray-200'
                      }`}
                    placeholder="••••••••"
                  />
                </div>

                {isEditing && (
                  <div className="flex gap-3 pt-4">
                    <Button
                      onClick={handleSave}
                      className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                    >
                      <Save className="h-4 w-4 mr-2" />
                      저장하기
                    </Button>
                    <Button
                      onClick={handleCancel}
                      variant="outline"
                      className="flex-1 border-gray-300 hover:bg-gray-50"
                    >
                      취소
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800">보안 설정</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                  <span className="text-sm text-gray-700">이중 인증</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-700">
                    활성화됨
                  </Badge>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg border border-blue-200">
                  <span className="text-sm text-gray-700">로그인 알림</span>
                  <Badge variant="secondary" className="bg-blue-100 text-blue-700">
                    설정됨
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-lg text-gray-800">활동 요약</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg border border-purple-200">
                  <span className="text-sm text-gray-700">총 주문 횟수</span>
                  <span className="font-bold text-purple-700">12회</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg border border-orange-200">
                  <span className="text-sm text-gray-700">적립 포인트</span>
                  <span className="font-bold text-orange-700">2,450P</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
