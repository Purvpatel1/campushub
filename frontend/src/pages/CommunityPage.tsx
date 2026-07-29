import React from 'react';
import { Card } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { MessageSquare, ThumbsUp, MessageCircle, Send, ShieldCheck } from 'lucide-react';
import { Avatar } from '@/components/ui/Avatar';

export const CommunityPage: React.FC = () => {
  const posts = [
    {
      id: '1',
      author: 'Sophia Martinez',
      role: 'Student',
      channel: 'Course Q&A (CS301)',
      time: '2 hours ago',
      title: 'Tips for optimizing AVL tree rotation logic in Lab 3?',
      content: 'Hey everyone! Make sure to calculate the balance factor BEFORE performing left/right rotations, otherwise height calculations get desynchronized.',
      likes: 24,
      replies: 8,
    },
    {
      id: '2',
      author: 'Dr. Aris Thorne',
      role: 'Faculty',
      channel: 'Physics Department',
      time: '4 hours ago',
      title: 'Office Hours Update for Midterm Prep',
      content: 'I will be holding additional virtual office hours this Thursday from 4 PM to 6 PM on CampusOS video lounge to address quantum mechanics review questions.',
      likes: 42,
      replies: 5,
      isVerified: true,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-black text-white tracking-tight flex items-center gap-2">
            <MessageSquare className="w-7 h-7 text-indigo-400" />
            <span>Campus Community Discussion Forums</span>
          </h1>
          <p className="text-sm text-slate-400 mt-1">Peer-to-peer discussions, faculty Q&A, and campus networking</p>
        </div>

        <Button variant="primary" leftIcon={<Send className="w-4 h-4" />}>
          Start Discussion Post
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Channel Navigation Sidebar */}
        <Card className="border-slate-800 lg:col-span-1 space-y-2">
          <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Channels</h2>
          <div className="space-y-1">
            <button className="w-full text-left px-3 py-2 rounded-xl text-xs font-bold bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 flex items-center justify-between">
              <span># Course Q&A (CS301)</span>
              <Badge variant="indigo" size="sm">12</Badge>
            </button>
            <button className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800/40">
              # General Campus
            </button>
            <button className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800/40">
              # Tech & Hackathons
            </button>
            <button className="w-full text-left px-3 py-2 rounded-xl text-xs font-semibold text-slate-400 hover:text-slate-200 hover:bg-slate-800/40">
              # Housing & Roommates
            </button>
          </div>
        </Card>

        {/* Forum Feed */}
        <div className="lg:col-span-3 space-y-4">
          {posts.map((post) => (
            <Card key={post.id} className="border-slate-800">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Avatar name={post.author} size="sm" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-bold text-white">{post.author}</span>
                      {post.isVerified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />}
                      <Badge variant={post.role === 'Faculty' ? 'emerald' : 'indigo'} size="sm">{post.role}</Badge>
                    </div>
                    <p className="text-[10px] text-slate-500">{post.time} in <span className="text-slate-400">{post.channel}</span></p>
                  </div>
                </div>
              </div>

              <h3 className="text-base font-bold text-white mt-3">{post.title}</h3>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">{post.content}</p>

              <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center gap-4 text-xs text-slate-400">
                <button className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors">
                  <ThumbsUp className="w-3.5 h-3.5" /> {post.likes} Upvotes
                </button>
                <button className="flex items-center gap-1.5 hover:text-indigo-400 transition-colors">
                  <MessageCircle className="w-3.5 h-3.5" /> {post.replies} Replies
                </button>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};
