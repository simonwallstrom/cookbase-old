import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { Dialog } from '@headlessui/react';
import Button from './Button';
import { supabase } from '../lib/supabase';
import { useUser } from '../lib/useUser';
import { useIsMounted } from '../lib/useIsMounted';
import useStore from '../lib/store';
import { Trash2 } from 'react-feather';

export default function CollectionForm({
  isOpen,
  setIsOpen,
  isEdit,
  collection,
  setCollection,
}) {
  let inputRef = useRef(null);
  const isMounted = useIsMounted();
  const { user } = useUser();
  const router = useRouter();
  const [collectionName, setCollectionName] = useState('');
  const { getAllCollections } = useStore();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setCollectionName(collection?.name || '');
  }, [collection]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1500));

    if (isEdit) {
      const { data, error } = await supabase
        .from('collections')
        .update({ name: collectionName })
        .eq('slug', collection.slug);
      if (error) setErrorMessage(error.message);
      if (data) {
        setIsOpen(false);
        setCollection(data[0]);
        getAllCollections();
      }
    } else {
      const { data, error } = await supabase
        .from('collections')
        .insert({ name: collectionName, user_id: user.id })
        .single();
      if (error) setErrorMessage(error.message);
      if (data) {
        setIsOpen(false);
        getAllCollections();
      }
    }

    setLoading(false);
  };

  const deleteCollection = async () => {
    const { data, error } = await supabase
      .from('collections')
      .delete()
      .eq('slug', collection.slug);
    if (error) setErrorMessage(error.message);
    if (data) {
      setIsOpen(false);
      getAllCollections();
      router.replace('/collections/');
    }
  };

  return (
    <div>
      {isMounted() && (
        <Dialog
          as="div"
          initialFocus={inputRef}
          className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-gray-900 bg-opacity-50"
          open={isOpen}
          onClose={() => setIsOpen(false)}
        >
          <Dialog.Overlay className="fixed inset-0" />
          <div className="relative w-full max-w-lg bg-white border border-black shadow-flat rounded-xl lg:px-12 lg:py-10">
            <Dialog.Title className="text-2xl font-bold">
              {isEdit ? (
                <span>Edit Collection</span>
              ) : (
                <span>New collection</span>
              )}
            </Dialog.Title>
            <Dialog.Description className="text-gray-600">
              Group recipes together with a collection.
            </Dialog.Description>

            <form onSubmit={handleSubmit}>
              <div className="mt-6">
                <label htmlFor="collectionName">Collection name</label>
                <input
                  type="text"
                  id="collectionName"
                  ref={inputRef}
                  placeholder="Midweek dinners..."
                  value={collectionName}
                  disabled={loading}
                  onChange={(e) => setCollectionName(e.target.value)}
                />
              </div>

              {errorMessage ? (
                <div className="px-5 py-3 mt-8 font-medium text-red-700 bg-red-100 rounded-md">
                  {errorMessage}
                </div>
              ) : null}
              <div className="flex mt-10">
                <Button
                  className="mr-6 btn btn--pink"
                  loading={loading}
                  type="submit"
                >
                  {isEdit ? (
                    <span>Update Collection</span>
                  ) : (
                    <span>Create collection</span>
                  )}
                </Button>
                <button className="btn" onClick={() => setIsOpen(false)}>
                  Cancel
                </button>
                <button
                  className="ml-auto bg-red-300 btn"
                  onClick={deleteCollection}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </form>
          </div>
        </Dialog>
      )}
    </div>
  );
}
