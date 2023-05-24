export const Settings: React.FC = () => {
  return (
    <div className="todo-settings">
      <p className="todo-settings__text">
        User Name: <span>Rikel</span>
      </p>
      <p className="todo-settings__text">
        User Email: <span>Rikel@rik.rik</span>
      </p>
      <div className="todo-settings__language-box">
        <label htmlFor="" className="todo-settings__label">
          Language
        </label>
        <input type="radio" />
        <input type="radio" />
      </div>
      <div>
        <label htmlFor="" className="todo-settings__label">
          Sounds
        </label>
        <input type="radio" />
      </div>
      <button className="todo__button-logout">Logout</button>
    </div>
  );
};
