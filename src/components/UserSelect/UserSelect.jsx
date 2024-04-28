import {Avatar, Link, Select, SelectItem} from "@nextui-org/react";
import {baseImageUrl} from "@/config/supabase.js";
import {setImgUrl} from "@/api/fetchAvatar.js";

const UserSelect = ({items, valueItem, setValue, color, error}) => {
  return (
      <Select
          aria-label='w'
          errorMessage={error ? error : ''}
          items={items}
          placeholder='Кто вы из членов команды?'
          className={`max-w-sm ${color !== '' ? 'border-danger border-3 rounded-2xl' : ''}`}
          color={color ? color : ''}
          variant="bordered"
          defaultSelectedKeys={valueItem ? [valueItem] : ''}
          classNames={{
            label: "group-data-[filled=true]:-translate-y-5",
            trigger: "min-h-16",
            listboxWrapper: "max-h-[400px]",
          }}
          listboxProps={{
            itemClasses: {
              base: [
                "rounded-md",
                "text-default-500",
                "transition-opacity",
                "data-[hover=true]:text-foreground",
                "data-[hover=true]:bg-default-100",
                "dark:data-[hover=true]:bg-default-50",
                "data-[selectable=true]:focus:bg-default-50",
                "data-[pressed=true]:opacity-70",
                "data-[focus-visible=true]:ring-default-500",
              ],
            },
          }}
          popoverProps={{
            classNames: {
              base: "before:bg-default-200",
              content: "p-0 border-small border-divider bg-background",
            },
          }}
          renderValue={(items) => {
            return items.map((item) => (
                <div key={item.key} className="flex items-center gap-2">
                  <Avatar
                      alt={item.data.name}
                      className="flex-shrink-0"
                      size="sm"
                      src={setImgUrl(item.data.id)}
                  />
                  <div className="flex flex-col">
                    <span>{item.data.name}</span>
                    <Link href={item.data.tg} className="text-default-500 text-tiny">{item.data.tg}</Link>
                  </div>
                </div>
            ));
          }}
      >
        {(user) => (
            <SelectItem onPress={() => setValue(user.id)} key={user.id} textValue={user.name}>
              <div className="flex gap-2 items-center">
                <Avatar alt={user.name} className="flex-shrink-0" size="sm" src={setImgUrl(user.id)} />
                <div className="flex flex-col">
                  <span className="text-small">{user.name}</span>
                  <span className="text-tiny text-default-400">{user.tg}</span>
                </div>
              </div>
            </SelectItem>
        )}
      </Select>
  );
};

export default UserSelect;