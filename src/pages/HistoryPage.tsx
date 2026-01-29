import React, { useState } from 'react';
import { Page, useNavigate, Header, Icon } from 'zmp-ui';
import { Trash2, X, Share2, Download, Home } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { useHistory, HistoryItem } from '../context/HistoryContext';
import { motion, AnimatePresence } from 'framer-motion';

const HistoryPage = () => {
    const { history, isLoading, removeFromHistory } = useHistory();
    const { t } = useTranslation();
    const navigate = useNavigate();
    const [selectedItem, setSelectedItem] = useState<HistoryItem | null>(null);

    const handleShare = (item: HistoryItem) => {
        console.log("Sharing item", item.id);
        // TODO: Connect Zalo Share here
    };

    const handleDownload = (item: HistoryItem) => {
        try {
            const byteString = atob(item.imageData.split(',')[1]);
            const ab = new ArrayBuffer(byteString.length);
            const ia = new Uint8Array(ab);
            for (let i = 0; i < byteString.length; i++) {
                ia[i] = byteString.charCodeAt(i);
            }
            const blob = new Blob([ab], { type: 'image/png' });
            const url = window.URL.createObjectURL(blob);

            const a = document.createElement('a');
            a.style.display = 'none';
            a.href = url;
            a.download = `tet_ai_history_${item.timestamp}.png`;
            document.body.appendChild(a);
            a.click();

            setTimeout(() => {
                document.body.removeChild(a);
                window.URL.revokeObjectURL(url);
            }, 1000);
        } catch (e) {
            console.error("Download failed", e);
        }
    };

    const handleDelete = async (e: React.MouseEvent, id: string) => {
        e.stopPropagation();
        if (confirm(t('history.delete_confirm') || 'Удалить это фото?')) {
            await removeFromHistory(id);
            if (selectedItem?.id === id) {
                setSelectedItem(null);
            }
        }
    };

    if (isLoading) {
        return (
            <Page className="flex items-center justify-center min-h-screen bg-black text-white">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-yellow-500"></div>
            </Page>
        );
    }

    return (
        <Page className="flex flex-col min-h-screen bg-black">
            <Header title="Lịch sử / History" textColor="white" backgroundColor="#000000" onBackClick={() => navigate('/')} showBackIcon={true} />

            <div className="px-4 pb-20 pt-4">
                {history.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-[60vh] text-gray-500 gap-4">
                        <div className="p-4 bg-gray-900 rounded-full">
                            <Icon icon="zi-clock-1" className="text-4xl" />
                        </div>
                        <p>{t('history.empty') || 'Пусто...'}</p>
                        <button onClick={() => navigate('/')} className="px-6 py-2 bg-yellow-600 text-white rounded-full font-bold">
                            {t('common.create_new') || 'Создать новое'}
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-2 gap-3">
                        {history.map((item, index) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="relative aspect-[3/4] bg-gray-900 rounded-xl overflow-hidden shadow-lg border border-white/10"
                                onClick={() => setSelectedItem(item)}
                            >
                                <img src={item.imageData} alt="History" className="w-full h-full object-cover" loading="lazy" />

                                {/* Timestamp badge */}
                                <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/50 backdrop-blur rounded text-[10px] text-white/80">
                                    {new Date(item.timestamp).toLocaleDateString()}
                                </div>

                                {/* Delete button (small overlay) */}
                                <button
                                    onClick={(e) => handleDelete(e, item.id)}
                                    className="absolute top-2 right-2 p-1.5 bg-red-500/80 rounded-full text-white hover:bg-red-600 transition-colors"
                                >
                                    <Trash2 size={14} />
                                </button>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>

            {/* Modal / Overlay for Preview */}
            <AnimatePresence>
                {selectedItem && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 bg-black/95 flex flex-col justify-center items-center p-4 backdrop-blur-xl"
                        onClick={() => setSelectedItem(null)}
                    >
                        <button
                            onClick={() => setSelectedItem(null)}
                            className="absolute top-4 right-4 p-2 text-white/50 hover:text-white"
                        >
                            <X size={32} />
                        </button>

                        <div className="relative w-full max-w-md aspect-[3/4] rounded-2xl overflow-hidden shadow-2xl border border-white/10" onClick={e => e.stopPropagation()}>
                            <img src={selectedItem.imageData} className="w-full h-full object-cover" alt="Preview" />
                        </div>

                        <div className="flex gap-6 mt-8 w-full max-w-xs justify-center" onClick={e => e.stopPropagation()}>
                            <button onClick={() => handleDownload(selectedItem)} className="flex flex-col items-center gap-2 text-white/80 hover:text-white">
                                <div className="p-3 bg-white/10 rounded-full">
                                    <Download size={24} />
                                </div>
                                <span className="text-xs">Save</span>
                            </button>
                            <button onClick={() => handleDelete({ stopPropagation: () => { } } as any, selectedItem.id)} className="flex flex-col items-center gap-2 text-white/80 hover:text-red-500">
                                <div className="p-3 bg-white/10 rounded-full">
                                    <Trash2 size={24} />
                                </div>
                                <span className="text-xs">Delete</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </Page>
    );
};

export default HistoryPage;
