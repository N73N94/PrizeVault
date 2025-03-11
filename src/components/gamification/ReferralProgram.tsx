import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Users,
  Copy,
  Mail,
  Share2,
  Facebook,
  Twitter,
  CheckCircle2,
  Gift,
  Award,
} from "lucide-react";

interface ReferralProgramProps {
  referralCode?: string;
  referralUrl?: string;
  referralCount?: number;
  pointsPerReferral?: number;
  totalPointsEarned?: number;
  referralHistory?: {
    name: string;
    email: string;
    date: Date;
    status: "pending" | "completed";
    pointsEarned: number;
  }[];
}

const ReferralProgram = ({
  referralCode = "USER123",
  referralUrl = "https://premiumraffles.com/ref/USER123",
  referralCount = 5,
  pointsPerReferral = 100,
  totalPointsEarned = 500,
  referralHistory = [
    {
      name: "John Doe",
      email: "john.doe@example.com",
      date: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
      status: "completed" as const,
      pointsEarned: 100,
    },
    {
      name: "Jane Smith",
      email: "jane.smith@example.com",
      date: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
      status: "completed" as const,
      pointsEarned: 100,
    },
    {
      name: "Mike Johnson",
      email: "mike.johnson@example.com",
      date: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      status: "completed" as const,
      pointsEarned: 100,
    },
    {
      name: "Sarah Williams",
      email: "sarah.williams@example.com",
      date: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
      status: "completed" as const,
      pointsEarned: 100,
    },
    {
      name: "Alex Brown",
      email: "alex.brown@example.com",
      date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      status: "pending" as const,
      pointsEarned: 100,
    },
  ],
}: ReferralProgramProps) => {
  const [emailInput, setEmailInput] = useState("");
  const [emails, setEmails] = useState<string[]>([]);
  const [copied, setCopied] = useState(false);
  const [inviteSent, setInviteSent] = useState(false);

  const handleCopyReferralCode = () => {
    navigator.clipboard.writeText(referralCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleCopyReferralLink = () => {
    navigator.clipboard.writeText(referralUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleAddEmail = () => {
    if (emailInput && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailInput)) {
      setEmails([...emails, emailInput]);
      setEmailInput("");
    }
  };

  const handleSendInvites = () => {
    if (emails.length > 0) {
      setInviteSent(true);
      setTimeout(() => {
        setInviteSent(false);
        setEmails([]);
      }, 2000);
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Users className="mr-2 h-5 w-5 text-primary" />
          Referral Program
        </CardTitle>
        <CardDescription>
          Invite friends to join and earn {pointsPerReferral} loyalty points for
          each successful referral
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="share">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="share">Share</TabsTrigger>
            <TabsTrigger value="stats">Stats</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="share" className="space-y-4 pt-4">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h3 className="text-sm font-medium">Your Referral Code</h3>
                <div className="flex">
                  <Input
                    value={referralCode}
                    readOnly
                    className="rounded-r-none"
                  />
                  <Button
                    variant="outline"
                    className="rounded-l-none border-l-0"
                    onClick={handleCopyReferralCode}
                  >
                    {copied ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <h3 className="text-sm font-medium">Your Referral Link</h3>
                <div className="flex">
                  <Input
                    value={referralUrl}
                    readOnly
                    className="rounded-r-none text-xs sm:text-sm"
                  />
                  <Button
                    variant="outline"
                    className="rounded-l-none border-l-0"
                    onClick={handleCopyReferralLink}
                  >
                    {copied ? (
                      <CheckCircle2 className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="pt-4">
                <h3 className="text-sm font-medium mb-2">Invite by Email</h3>
                <div className="flex space-x-2 mb-2">
                  <Input
                    placeholder="friend@example.com"
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                  />
                  <Button variant="outline" onClick={handleAddEmail}>
                    Add
                  </Button>
                </div>

                {emails.length > 0 && (
                  <div className="space-y-2 mb-4">
                    <div className="bg-gray-50 p-3 rounded-md max-h-32 overflow-y-auto">
                      {emails.map((email, index) => (
                        <div
                          key={index}
                          className="text-sm py-1 flex justify-between"
                        >
                          <span>{email}</span>
                          <button
                            className="text-red-500 hover:text-red-700"
                            onClick={() =>
                              setEmails(emails.filter((_, i) => i !== index))
                            }
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                    <Button onClick={handleSendInvites} className="w-full">
                      {inviteSent ? (
                        <>
                          <CheckCircle2 className="mr-2 h-4 w-4" />
                          Sent Successfully
                        </>
                      ) : (
                        <>
                          <Mail className="mr-2 h-4 w-4" />
                          Send {emails.length} Invitation
                          {emails.length > 1 ? "s" : ""}
                        </>
                      )}
                    </Button>
                  </div>
                )}

                <div className="flex flex-col sm:flex-row gap-2 mt-4">
                  <Button variant="outline" className="flex-1">
                    <Mail className="mr-2 h-4 w-4" />
                    Email
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Facebook className="mr-2 h-4 w-4" />
                    Facebook
                  </Button>
                  <Button variant="outline" className="flex-1">
                    <Twitter className="mr-2 h-4 w-4" />
                    Twitter
                  </Button>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="stats" className="pt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <Users className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold">{referralCount}</p>
                <p className="text-sm text-gray-500">Successful Referrals</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <Gift className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold">{pointsPerReferral}</p>
                <p className="text-sm text-gray-500">Points Per Referral</p>
              </div>
              <div className="bg-gray-50 p-4 rounded-lg text-center">
                <Gift className="h-6 w-6 mx-auto mb-2 text-primary" />
                <p className="text-2xl font-bold">{totalPointsEarned}</p>
                <p className="text-sm text-gray-500">Total Points Earned</p>
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-sm font-medium mb-2">Referral Rewards</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-gray-500" />
                    <span>5 Referrals</span>
                  </div>
                  <span className="font-medium">500 bonus points</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-gray-500" />
                    <span>10 Referrals</span>
                  </div>
                  <span className="font-medium">1,500 bonus points</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <Users className="h-5 w-5 mr-2 text-gray-500" />
                    <span>25 Referrals</span>
                  </div>
                  <span className="font-medium">5,000 bonus points</span>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="history" className="pt-4">
            {referralHistory.length > 0 ? (
              <div className="space-y-3">
                {referralHistory.map((referral, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded-lg"
                  >
                    <div>
                      <p className="font-medium">{referral.name}</p>
                      <p className="text-sm text-gray-500">{referral.email}</p>
                      <p className="text-xs text-gray-400">
                        {formatDate(referral.date)}
                      </p>
                    </div>
                    <div className="text-right">
                      <span
                        className={`inline-block px-2 py-1 rounded-full text-xs ${referral.status === "completed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}`}
                      >
                        {referral.status === "completed"
                          ? "Completed"
                          : "Pending"}
                      </span>
                      {referral.status === "completed" && (
                        <p className="text-sm font-medium mt-1">
                          +{referral.pointsEarned} points
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="h-12 w-12 mx-auto text-gray-300 mb-3" />
                <p className="text-gray-500">No referrals yet</p>
                <p className="text-sm text-gray-400 mt-1">
                  Invite friends to start earning rewards
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="border-t pt-4">
        <p className="text-xs text-gray-500">
          Earn {pointsPerReferral} points for each friend who signs up and makes
          their first purchase. Additional bonuses available for multiple
          referrals.
        </p>
      </CardFooter>
    </Card>
  );
};

export default ReferralProgram;
