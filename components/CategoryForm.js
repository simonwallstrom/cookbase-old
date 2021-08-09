import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { Dialog } from '@headlessui/react';
import Button from './Button';
import { supabase } from '../lib/supabase';
import { useUser } from '../lib/useUser';
import { useIsMounted } from '../lib/useIsMounted';
import useStore from '../lib/store';
import { Trash2 } from 'react-feather';

export default function CategoryForm({
  isOpen,
  setIsOpen,
  isEdit,
  category,
  setCategory,
}) {
  let inputRef = useRef(null);
  const isMounted = useIsMounted();
  const { user } = useUser();
  const router = useRouter();
  const [categoryName, setCategoryName] = useState('');
  const { getAllCategories } = useStore();
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    setCategoryName(category?.name || '');
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((res) => setTimeout(res, 1500));

    if (isEdit) {
      const { data, error } = await supabase
        .from('categories')
        .update({ name: categoryName })
        .eq('slug', category.slug);
      if (error) setErrorMessage(error.message);
      if (data) {
        setIsOpen(false);
        setCategory({
          ...category,
          name: data[0].name,
        });
        getAllCategories();
      }
    } else {
      const { data, error } = await supabase
        .from('categories')
        .insert({ name: categoryName, user_id: user.id })
        .single();
      if (error) setErrorMessage(error.message);
      if (data) {
        setIsOpen(false);
        getAllCategories();
      }
    }

    setLoading(false);
  };

  const deleteCategory = async () => {
    const { data, error } = await supabase
      .from('categories')
      .delete()
      .eq('slug', category.slug);
    if (error) setErrorMessage(error.message);
    if (data) {
      setIsOpen(false);
      getAllCategories();
      router.replace('/categories/');
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
          <div className="relative w-full max-w-lg bg-white rounded-xl lg:px-12 lg:py-10">
            <Dialog.Title className="text-2xl font-bold">
              {isEdit ? <span>Edit category</span> : <span>New category</span>}
            </Dialog.Title>
            <Dialog.Description className="text-gray-600">
              Group recipes together with a category.
            </Dialog.Description>

            <form onSubmit={handleSubmit}>
              <div className="mt-6">
                <label htmlFor="categoryName">Category name</label>
                <input
                  type="text"
                  id="categoryName"
                  ref={inputRef}
                  placeholder="Midweek dinners..."
                  value={categoryName}
                  disabled={loading}
                  onChange={(e) => setCategoryName(e.target.value)}
                />
              </div>

              {errorMessage ? (
                <div className="px-5 py-3 mt-8 font-medium text-red-700 bg-red-100 rounded-md">
                  {errorMessage}
                </div>
              ) : null}
              <div className="flex mt-10">
                <Button
                  className="mr-6 btn btn--black"
                  loading={loading}
                  type="submit"
                >
                  {isEdit ? (
                    <span>Update category</span>
                  ) : (
                    <span>Create category</span>
                  )}
                </Button>
                <button className="btn" onClick={() => setIsOpen(false)}>
                  Cancel
                </button>
                <button
                  className="ml-auto text-red-700 btn"
                  onClick={deleteCategory}
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
