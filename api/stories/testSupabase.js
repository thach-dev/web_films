const { supabase } = require('./lib/supabaseClient');

(async () => {
  const { data, error } = await supabase
    .from('story')
    .select('*')
    .eq('id', 1)
    .single(); // hoặc .maybeSingle() nếu bạn không chắc có dữ liệu

  if (error) {
    console.error('Lỗi:', error);
  } else {
    console.log('Dữ liệu:', data);
  }
})();
