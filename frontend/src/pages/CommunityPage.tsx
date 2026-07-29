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
      channel: 'CS301 Q&A',
      time: '2 hours ago',
      title: 'AVL tree rotation logic in Lab 3',
      content: 'Calculate the balance factor BEFORE performing rotations to avoid height calculation mismatch.',
      likes: 24,
      replies: 8,
    },
    {
      id: '2',
      author: 'Dr. Aris Thorne',
      role: 'Faculty',
      channel: 'Physics',
      time: '4 hours ago',
      title: 'Midterm Prep Office Hours Update',
      content: 'Virtual office hours scheduled Thursday from 4 PM to 6 PM on CampusOS video lounge.',
      likes: 42,
      replies: 5,
      isVerified: true,
    },
  ];

  return (
    <div className="space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h1 className="text-1xl text-xl font-bold text-white tracking-tight flex items-center gap-2">
            <MessageSquare className="w-5 h-5 text-indigo-400" />
            <span>Community Forums</span>
          </h1>
          <p className="text-xs text-zinc-400 mt-0.5">Peer discussions, course Q&A, and faculty updates</p>
        </div>

        <Button variant="primary" leftIcon={<Send className="w-3.5 h-3.5" />}>
          New Post
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        {/* Channels */}
        <Card className="lg:col-span-1 space-y-2 p-3">
          <h2 className="text-[10px] font-mono font-semibold text-zinc-500 uppercase tracking-wider mb-1 px-1">Channels</h2>
          <div className="space-y-0.5">
            <button className="w-full text-left px-2.5 py-1.5 rounded-md text-xs font-semibold bg-zinc-800 text-zinc-100 flex items-center justify-between">
              <span># CS301 Q&A</span>
              <Badge variant="indigo" size="sm">12</Badge>
            </button>
            <button className="w-full text-left px-2.5 py-1.5 rounded-md text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900">
              # General Campus
            </button>
            <button className="w-full text-left px-2.5 py-1.5 rounded-md text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900">
              # Tech & Projects
            </button>
            <button className="w-full text-left px-2.5 py-1.5 rounded-md text-xs font-medium text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900">
              # Housing
            </button>
          </div>
        </Card>

        {/* Forum Feed */}
        <div className="lg:col-span-3 space-y-3">
          {posts.map((post) => (
            <Card key={post.id}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <Avatar name={post.author} size="sm" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-semibold text-white">{post.author}</span>
                      {post.isVerified && <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />}
                      <Badge variant={post.role === 'Faculty' ? 'emerald' : 'indigo'} size="sm">{post.role}</Badge>
                    </div>
                    <p className="text-[10px] text-zinc-500">{post.time} in <span className="text-zinc-400">#{post.channel}</span></p>
                  </div>
                </div>
              </div>

              <h3 className="text-sm font-semibold text-white mt-2">{post.title}</h3>
              <p className="text-xs text-zinc-300 mt-1 leading-relaxed">{post.content}</p>

              <div className="mt-3 pt-2 border-t border-zinc-800 flex items-center gap-4 text-xs text-zinc-400 font-mono">
                <button className="flex items-center gap-1 hover:text-indigo-400 transition-colors">
                  <ThumbsUp className="w-3.5 h-3.5" /> {post.likes}
                </button>
                <button className="flex items-center gap-1 hover:text-indigo-400 transition-colors">
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
