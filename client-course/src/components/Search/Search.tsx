import { useForm } from "react-hook-form";
import { InputField } from "../form/InputField";
import { useNavigate } from "react-router";
import { Input } from "../ui/input";

const Search = () => {
  // Use the useLoginMutation hook to get the login mutation
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const onSubmit = async (data) => {
    // Navigate to search results page
    navigate(`/search?q=${data.search.trim().toLowerCase().split(" ").join("+")}`);
  };

  return (
    <div>
      <div>
        <div>
          <div>
            <div className="w-full">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <Input
                className="rounded-full h-10"
                  id="search"
                  type="text"
                  {...register("search")}
                  placeholder="Search for courses..."
                  
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
