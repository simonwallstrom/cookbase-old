import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Dialog } from '@headlessui/react';
import Button from './Button';
import { supabase } from '../lib/supabase';
import { useUser } from '../lib/useUser';

export default function CollectionForm({
  isOpen,
  setIsOpen,
  isEdit,
  loadingCollection,
  editCollection,
  collections,
  setCollections,
}) {
  const { user } = useUser();
  const [collectionName, setCollectionName] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1500));

    const collectionData = {
      name: collectionName,
      user_id: user.id,
    };

    if (isEdit) {
      const { data, error } = await supabase
        .from('recipes')
        .update(collectionData)
        .eq('slug', editRecipe.slug);
      if (error) setErrorMessage(error.message);
      if (data) {
        fetchCollections();
      }
    } else {
      const { data, error } = await supabase
        .from('collections')
        .insert(collectionData)
        .single();
      if (error) setErrorMessage(error.message);
      if (data) {
        setIsOpen(false);
        setCollections([data, ...collections]);
      }
    }
    setLoading(false);
  };

  return (
    <Dialog
      as="div"
      className="fixed inset-0 z-10 flex items-center justify-center overflow-y-auto bg-black bg-opacity-30"
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <Dialog.Overlay className="fixed inset-0" />
      <div className="relative w-full max-w-lg bg-white rounded-lg shadow-md lg:px-12 lg:py-10">
        <Dialog.Title className="text-2xl font-bold">
          New collection
        </Dialog.Title>
        <Dialog.Description className="text-gray-600">
          Group recipes together with a new collection
        </Dialog.Description>

        <form onSubmit={handleSubmit}>
          <div className="mt-6">
            <label htmlFor="collectionName">Collection name</label>
            <input
              type="text"
              id="collectionName"
              placeholder="Midweek dinners..."
              value={collectionName}
              disabled={loadingCollection}
              autoFocus
              onChange={(e) => setCollectionName(e.target.value)}
            />
          </div>

          {errorMessage ? (
            <div className="px-5 py-3 mt-8 font-medium text-red-700 bg-red-100 rounded-md">
              {errorMessage}
            </div>
          ) : null}
          <div className="flex mt-10 space-x-6">
            <Button
              className="btn btn--primary"
              loading={loading}
              type="submit"
            >
              Save recipe
            </Button>
            <Link href="/recipes">
              <a className="btn">Cancel</a>
            </Link>
          </div>
        </form>

        {/* <button onClick={() => setIsOpen(false)}>Deactivate</button>
        <button onClick={() => setIsOpen(false)}>Cancel</button> */}
      </div>
    </Dialog>
  );
}
